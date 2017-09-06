<style lang="sass">
	.sunset-form {
		.ivu-col {
			position: relative;
		}
		.group-title {
			font-size: 16px;
			padding: 5px 15px;
		}
		.ivu-alert {
			margin-bottom: 0px;
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
				{{{newline(field)}}}
				<div v-if="field.group" :class="'ivu-col ivu-col-span-24'" :style="field.groupStyle">
					<div class="group-title">{{{field.group}}}
						<sunset-toolbar v-if="field.groupToolbar" :options="field.groupToolbar" :ctx="model" @signal="operateSignal"></sunset-toolbar>
					</div>
				</div>
				<i-col :span="computedFieldClass(field)" :style="field.fieldStyle">
					<sunset-field v-ref:field :options="field" :form-options="options" :value.sync="model[field.name]" :model="model" @ready="promiseWidgetReady"
					    @change="fieldValueChange" @remove="removeField(field)"></sunset-field>
				</i-col>
			</template>
		</Row>
		<Alert v-if="options.tip" :type="tip.color">
			{{{tip.text}}}
		</Alert>
		<button style="display:none;" type="button"></button>
		<div v-if="options.tools!==false" style="text-align:center;">
			<sunset-toolbar :options="tools" :ctx="model" @signal="operateSignal"></sunset-toolbar>
		</div>
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
				fields = fields.filter(field => (field.premise ? field.premise(model) : true));
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
					if (field.name) {
						this.$set(`model.${field.name}`, this.defaultValueMap[field.name]);
						var defaulValue = field.default || field.defaultValue;
						if (defaulValue) {
							defaultValueFields.push(field);
							prall.push(Promise.resolve().then(() => {
								return Sunset.isFunction(defaulValue) ? defaulValue() : defaulValue;
							}));
						}
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
			removeField(field) {
				var model = this.model;
				this.options.fields.splice(this.options.fields.indexOf(field), 1);
				delete this.model[field.name];
			},
			getModel(origin) {
				return origin ? this.model : Sunset.clone(this.model);
			},
			generateModel() {
				return Promise.resolve().then(() => {
					//校验
					if (!this.formValid) {
						this.showWarning = true;
						throw new Error();
					}
					var model = Sunset.clone(this.model);
					if (model) {
						Object.keys(model).forEach(key => {
							if (Sunset.isString(model[key])) {
								model[key] = model[key].trim();
							}
						});
					}
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
						Promise.resolve(this.options.submit(model)).then(res => {
							this.$emit('signal', 'SAVED', res, model);
						}).catch(e => {
							console.error(e);
							this.$emit('signal', 'SAVE-ERROR', e);
						});
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
				Promise.resolve(this.rebuild(record)).then(() => {
					this.hasModel = !!record;
					this.record = Sunset.clone(record);
					var model = this.cast(Sunset.clone(record) || {});
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
			},
			rebuild(model) {
				if (this.options.rebuild) {
					return this.options.rebuild.call(null, model, this.options);
				}
			}
		},
		ready() {
			this.init();
		}
	}
</script>