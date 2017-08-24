<style lang="sass">
	.sunset-form-field {
		display: table;
		width: 100%;
		min-height: 35px;
		margin-bottom: 15px;
		border-right: 20px solid rgba(255, 255, 255, 0);
		box-sizing: border-box;
		font-size: 0px;
		.sunset-field-label {
			font-size: 12px;
			display: table-cell;
			min-width: 80px;
			white-space: nowrap;
			text-align: right;
			padding-left: 10px;
			padding-right: 15px;
			vertical-align: middle;
		}
		.sunset-field {
			font-size: 12px;
			display: table-cell;
			width: 100%;
			vertical-align: middle;
		}
		.field-invalid-tip {
			position: absolute;
			font-size: 16px;
			top: 8px;
			right: 0px;
		}
		&.required-field {
			.sunset-field-label:before {
				content: '*';
				color: red;
				padding: 0px 2px;
			}
		}
		$color: rgba(#464c5b, 0.9);
		.sunset-field-wraning-pop-wrap {
			display: none;
			position: absolute;
			z-index: 9999;
			padding: 5px 8px;
			background: $color;
			border: 1px solid $color;
			color: #FFF;
			border-radius: 3px;
			font-size: 12px;
			right: -20px;
			top: -32px;
			&:before {
				position: absolute;
				right: 20px;
				content: '';
				width: 0px;
				height: 0px;
				border-style: solid;
				border-width: 8px 6px;
			}
			&:before {
				bottom: -17px;
				border-color: $color transparent transparent transparent;
			}
		}
	}
</style>
<template>
	<div :class="['sunset-form-field',options.validate&&options.validate.required?'required-field':'']">
		<validator name="validation">
			<label v-if="options.label" :style="labelStyle" class="sunset-field-label">{{options.label}}</label>
			<component :is="widget" :ref="widget" :options="options" :form-options="formOptions" :value.sync="value" :model="model" :invalid="invalid"
			    @ready="widgetReady"></component>
			<input type="hidden" :maxlength="maxlength" field="field" v-model="value" v-validate="options.validate" />
			<div v-show="invalid" class="sunset-field-wraning-pop-wrap">{{invalid}}</div>
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
			formOptions: {

			},
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
										message: RULE_MESSAGE_REPLACES[k].replace('FIELD', field.label || '').replace('RULE', validate[k])
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
			labelStyle() {
				if (this.options.labelStyle) {
					return this.options.labelStyle;
				} else if (this.formOptions.labelWidth) {
					return `min-width:${this.formOptions.labelWidth}px`;
				} else {
					return `min-width:${Sunset.getConfig('FORM_FIELD_LABEL_WIDTH',80)}px`;
				}
			},
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
			widgetReady(name, defaultValue) {
				this.$emit('ready', name, defaultValue);
			},
			generateWatchDependent(watchs) {
				var dep = {},
					model = this.model;
				watchs.split(',').forEach(w => {
					dep[w] = model[w];
				});
				return dep;
			},
			rebuild(watchs, rebuild) {
				Promise.resolve().then(() => {
					return rebuild.call(this.options, this.generateWatchDependent(watchs), this.options, this.model, this.formOptions);
				}).then(res => {
					this.$children[0].init && this.$children[0].init();
				});
			}
		},
		ready() {
			//监听变化
			this.$watch('value', function (v, oldValue) {
				this.options.onChange && this.options.onChange(v, this.model, this.$parent.$parent.$parent, this.options, this.formOptions,
					oldValue);
				this.$emit('change', v, this.model);
			});
			if (this.options.watch) {
				var watchs,
					rebuild;
				if (Sunset.isString(this.options.watch) && Sunset.isFunction(this.options.rebuild)) {
					watchs = this.options.watch;
					rebuild = this.options.rebuild;
				} else if (Sunset.isArray(this.options.watch)) {
					if (Sunset.isString(this.options.watch[0]) && Sunset.isFunction(this.options.watch[1])) {
						watchs = this.options.watch[0];
						rebuild = this.options.watch[1];
					}
				}
				//监听重建
				if (watchs && rebuild) {
					watchs.split(',').forEach(w => {
						this.$watch(`model.${w}`, (v) => {
							this.rebuild(watchs, rebuild);
						});
					});
					this.rebuild(watchs, rebuild);
				}
			}
		}
	};
</script>