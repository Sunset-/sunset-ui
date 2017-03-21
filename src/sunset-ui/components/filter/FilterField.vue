<style lang="sass">
	.sunset-filter-field {
		display: inline-block;
		margin-right: 15px;
		vertical-align: middle;
		&:last-child {
			margin-right: 0px;
		}
		.sunset-field-wrap {
			width: 100%;
			display: inline-table;
			.sunset-field-label {
				display: table-cell;
				padding: 0px 10px;
				white-space: nowrap;
				text-align: right;
				vertical-align: middle;
				&.sunset-field-label-empty {
					padding: 0px;
				}
			}
			.sunset-field {
				display: table-cell;
			}
		}
		.control-label {
			display: table-cell;
			padding: 0px 10px;
			white-space: nowrap;
			vertical-align: middle;
		}
		.input-group {
			display: table-cell;
			width: 100%;
		}
	}
</style>
<template>
	<div v-show="!options.hide" class="sunset-filter-field" :style="options.style">
		<div :is="widget" :options="options" :value.sync="value"></div>
	</div>
</template>
<script>
	import widgets from '../widgets/filter-widgets.js';

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
					//宽度
					field.labelCols = field.labelCols || 3;
					field.widgetCols = field.widgetCols || 7;
					return field;
				}
			},
			wrapClass: {
				type: String,
				default: 'inline'
			},
			value: {

			}
		},
		data() {
			return {};
		},
		computed: {
			widget() {
				return 'widget-' + this.options.widget;
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
			}
		},
		ready() {
			if (this.options.defaultValue != void 0) {
				if (Sunset.isFunction(this.options.defaultValue)) {
					var res = this.options.defaultValue();
					if (res && Sunset.isFunction(res.then)) {
						res.then(data => {
							this.value = data;
						});
					} else {
						this.value = res;
					}
				} else {
					this.value = this.options.defaultValue;
				}
			}
			if (this.options.onChange || this.options.changeFilter) {
				this.$watch('value', (v) => {
					this.options.onChange && this.options.onChange(v);
					this.options.changeFilter && this.$dispatch('FIELD_SEARCH');
				});
			}
		}
	};
</script>