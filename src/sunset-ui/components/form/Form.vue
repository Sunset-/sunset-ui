<style lang="sass">
	.sunset-form {
		.group-title {
			font-size: 16px;
			padding: 5px 15px;
		}
		.ivu-alert {
			margin-bottom: 0px;
		}
		.sunset-toolbar {
			display: block;
		}
		&.sunset-form-show-warning {
			.sunset-field-wraning-pop-wrap {
				display: block;
			}
		}
	}
</style>
<template>
	<form :class="['sunset-form form-horizontal',showWarning?'sunset-form-show-warning':'']" @submit.prevent="submit">
		<Row>
			<template v-for="field in fields" v-ref:fields>
				<div>
					{{{newline(field)}}}
					<i-col v-if="field.group" :span="24">
						<div class="group-title">{{field.group}}</div>
					</i-col>
				</div>
				<i-col :span="computedFieldClass(field)">
					<sunset-field v-ref:field :options="field" :value.sync="model[field.name]" :model="model" @ready="promiseWidgetReady" @change="fieldValueChange"></sunset-field>
				</i-col>
			</template>
		</Row>
		<Alert v-if="options.tip" :type="tip.color">
			{{{tip.text}}}
		</Alert>
		<button style="display:none;" type="submit"></button>
		<sunset-toolbar v-if="options.tools!==false" :options="tools" @signal="operateSignal" style="text-align:center;"></sunset-toolbar>
	</form>
</template>
<script>
	import SunsetField from './Field';
	import Pop from '../pop';

	const FULL_COLS = 24;
	const DEFAULT_COLS = 3;

	export default {
		components: {
			SunsetField
		},
		props: {
			options: {
				type: Object
			}
		},
		data() {
			return {
				record: null,
				model: {},
				hasModel: false,
				fieldsRefresher: 0,
				defaultValueMap: {},
				showWarning: false
			}
		},
		computed: {
			fields() {
				var model = this.model,
					fields = this.options && this.options.fields || [],
					record = this.record,
					fieldsRefresher = this.fieldsRefresher;
				fields = fields.filter(field => !!field.name && (field.premise ? field.premise(model) : true));
				//初始化
				if (record) {
					fields = fields.map(f => {
						if (Sunset.isFunction(f.init)) {
							f = f.init(this.hasModel ? record : null) || f;
						}
						return f;
					});
				}
				return fields;
			},
			cols() {
				return this.options.cols || DEFAULT_COLS;
			},
			tools() {
				return this.options.tools || [{
					label: '保存',
					color: 'success',
					signal: 'SUBMIT'
				}, {
					label: '取消',
					color: 'ghost',
					signal: 'CANCEL'
				}];
			},
			formValid() {
				var fields = this.$refs.fields;
				if (fields) {
					for (var i = 0, field; field = fields[i++];) {
						if (field.$children && field.$children.length && field.$children[0].invalid) {
							return false;
						}
					}
				}
				return true;
			},
			tip() {
				return this.options.tip || {};
			}
		},
		methods: {
			init() {
				var model = this.model,
					fields = this.options.fields || [],
					defaultValueFields = [],
					prall = [];
				fields.forEach(field => {
					this.$set(`model.${field.name}`, this.defaultValueMap[field.name]);
					var defaulValue = field.default || field.defaultValue;
					if (defaulValue) {
						defaultValueFields.push(field);
						prall.push(Promise.resolve().then(() => {
							return Sunset.isFunction(defaulValue) ? defaulValue() : defaulValue;
						}));
					}
				});
				Promise.all(prall).then((res) => {
					if (model === this.model) {
						res.forEach((dv, index) => {
							model[defaultValueFields[index].name] = dv;
						});
					}
				});
			},
			promiseWidgetReady(name, defaultValue) {
				this.defaultValueMap[name] = defaultValue;
			},
			computedFieldClass(field) {
				if (field.monopolize) {
					return FULL_COLS;
				} else if (field.cols) {
					return field.cols;
				} else {
					return FULL_COLS / this.cols;
				}
			},
			generateModel() {
				return Promise.resolve().then(() => {
					//校验
					if (!this.formValid) {
						this.showWarning = true;
						throw new Error();
						return;
					}
					var model = Sunset.clone(this.model);
					//格式化
					if (Sunset.isFunction(this.options.format)) {
						model = this.options.format && this.options.format(model, this.record) || model;
					}
					//外部校验
					if (Sunset.isFunction(this.options.validate)) {
						return Promise.resolve().then(() => {
							return this.options.validate(model);
						}).then(() => {
							return model;
						});
					} else {
						return model;
					}
				});
			},
			operateSignal(signal) {
				switch (signal) {
					case 'SUBMIT':
						try {
							this.submit();
						} catch (e) {}
						break;
					default:
						this.$emit.apply(this, ['signal'].concat([].slice.call(arguments)));
				}
			},
			submit() {
				this.generateModel().then(model => {
					if (Sunset.isFunction(this.options.submit)) {
						this.options.submit(model);
					} else if (this.options.store) {
						this.options.store[this.options.method || 'save'](model).then(res => {
							Sunset.tip(this.options.successTip || '保存成功', 'success');
							this.$emit('signal', 'SAVED', res, model);
						}).catch(e => {
							console.error(e);
							this.$emit('signal', 'SAVE-ERROR', e);
						});
					}
					this.$emit('submit', model);
				}).catch(e => {
					this.$emit('signal', 'SAVE-ERROR', e);
					if (e && e.message) {
						Sunset.tip(e.message, 'warning');
					}
				});
			},
			reset(record) {
				this.hasModel = !!record;
				this.record = Sunset.clone(record);
				var model = this.cast(record || {});
				if (Sunset.isFunction(this.options.cast)) {
					model = this.options.cast(model) || model;
				}
				this.fieldsRefresher++;
				this.$nextTick(() => {
					this.model = model;
					if (!this.hasModel) {
						this.init();
					}
				});
			},
			cast(model) {
				this.fields && this.fields.forEach(f => {
					if (model[f.name] != null && f.dataType) {
						switch (f.dataType) {
							case String:
								model[f.name] = String(model[f.name]);
						}
					}
				});
				return model;
			},
			fieldValueChange() {
				this.showWarning = false;
			},
			newline(field) {
				return field.newline ? `</div><div style="z-index:-1;" class="ivu-row">` : '';
			}
		},
		ready() {
			this.init();
		}
	}
</script>