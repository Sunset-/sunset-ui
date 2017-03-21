<style lang="sass">
	.sunset-form-field {
		position: relative;
		width: 76%;
		margin-left: 20px;
		margin-bottom: 15px;
		font-size: 0px;
		.sunset-field-wrap {
			width: 100%;
			display: inline-table;
			font-size: 12px;
			.sunset-field-label {
				display: table-cell;
				min-width: 80px;
				white-space: nowrap;
				text-align: right;
				padding-right: 15px;
				vertical-align: middle;
			}
			.sunset-field {
				display: table-cell;
				width: 100%;
			}
		}
		.field-invalid-tip {
			position: absolute;
			font-size: 16px;
			top: 8px;
			right: -20px;
		}
		&.required-field {
			.sunset-field-label:before {
				content: '*';
				color: red;
				padding: 0px 2px;
			}
		}
	}
</style>
<template>
	<div :class="['sunset-form-field',options.validate&&options.validate.required?'required-field':'']">
		<validator name="validation">
			<div :is="widget" :ref="widget" :options="options" :value.sync="value" :invalid="invalid"></div>
			<input type="hidden" :maxlength="maxlength" field="field" v-model="value" v-validate="options.validate" />
			<i v-show="invalid" class="field-invalid-tip ivu-icon ivu-icon-information-circled text-warning sunset-pop" :data-content="invalid"></i>
		</validator>
	</div>
</template>
<script>
	import widgets from '../widgets/widgets.js';

	var RULE_MESSAGE_REPLACES = {
		'required': 'FIELD不能为空',
		'min': 'FIELD不能小于RULE',
		'max': 'FIELD不能大于RULE',
		'maxlength': '最大长度为RULE',
		'minlength': '最小长度为RULE'
	};

	export default {
		components: widgets,
		props: {
			options: {
				type: Object,
				coerce(field) {
					//校验
					var validate;
					if (validate = field.validate) {
						for (var k in RULE_MESSAGE_REPLACES) {
							if (RULE_MESSAGE_REPLACES.hasOwnProperty(k)) {
								if (validate[k] && (typeof validate[k] != 'object')) {
									validate[k] = {
										rule: validate[k],
										message: RULE_MESSAGE_REPLACES[k].replace('FIELD', field.label).replace('RULE', validate[k])
									};
								}
							}
						}
					}
					return field;
				}
			},
			value: {

			},
			model: {

			}
		},
		data() {
			return {};
		},
		computed: {
			widget() {
				return 'widget-' + (this.options.widget || this.options.type);
			},
			invalid() {
				if (this.options.validate && this.$validation.field.invalid) {
					return this.$validation.field.errors && this.$validation.field.errors.length && this.$validation
						.field.errors[0].message;
				}
				return null;
			}
		},
		methods: {
			onChange(v) {
				this.value = v;
			},
			generateWatchDependent(watchs) {
				var watchs = this.options.watch,
					dep = {},
					model = this.model;
				watchs.split(',').forEach(w => {
					dep[w] = model[w];
				});
				return dep;
			}
		},
		ready() {
			if (this.options.onChange) {
				//监听变化
				this.$watch('value', function (v) {
					this.options.onChange(v);
				});
			}
			if (this.options.watch) {
				//监听重建
				if (Sunset.isString(this.options.watch)) {
					this.options.watch.split(',').forEach(w => {
						this.$watch(`model.${w}`, (v) => {
							Promise.resolve().then(() => {
								return this.options.rebuild(this.generateWatchDependent(), this.options);
							}).then(res => {
								this.$children[0].init && this.$children[0].init();
							});
						});
					});
				} else {
					console.error('watch must be a string');
				}
			}
		}
	};
</script>