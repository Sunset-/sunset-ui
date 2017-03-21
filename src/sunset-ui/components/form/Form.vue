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
	}
</style>
<template>
	<form class="sunset-form form-horizontal" @submit.prevent="submit">
		<Row>
			<template v-for="field in fields" v-ref:fields>
				<i-col v-if="field.group" :span="24">
					<div class="group-title">{{field.group}}</div>
				</i-col>
				<i-col :span="computedFieldClass(field)">
					<sunset-field v-ref:field :options="field" :value.sync="model[field.name]" :model="model"></sunset-field>
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
				fieldsRefresher: 0
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
				this.lock = true;
				fields.forEach(field => {
					this.$set(`model.${field.name}`, void 0);
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
				if (!this.formValid) {
					throw new Error('校验不通过');
					return;
				}
				//var model = Object.assign({}, this.model);
				var model = JSON.parse(JSON.stringify(this.model));
				//表单项格式化
				//var fields = this.fields;
				//格式化
				if (Sunset.isFunction(this.options.format)) {
					model = this.options.format && this.options.format(model, this.record) || model;
				}
				//校验
				return Promise.resolve().then(() => {
					if (Sunset.isFunction(this.options.validate)) {
						return Promise.resolve().then(() => {
							return this.options.validate(model);
						}).then(res => {
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
				try {
					Promise.resolve().then(() => {
						return this.generateModel();
					}).then(model => {
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
					}).catch(e => {
						console.error(e);
						this.$emit('signal', 'SAVE-ERROR', e);
					});
				} catch (e) {
					console.error(e);
					this.$emit('signal', 'SAVE-ERROR', e);
				}
			},
			reset(record) {
				this.hasModel = !!record;
				this.record = JSON.parse(JSON.stringify(record || {}));
				var model = this.cast(record || {});
				if (Sunset.isFunction(this.options.cast)) {
					model = this.options.cast(model) || model;
				}
				this.fieldsRefresher++;
				this.$broadcast('REFRESH_WIDGET_VALUE');
				this.$nextTick(() => {
					this.model = model;
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
			}
		},
		ready() {
			this.init();
		}
	}
</script>