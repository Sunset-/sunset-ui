<style lang="sass">
	.sunset-filter-field {
		display: inline-block;
		margin-right: 10px;
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
	<div v-show="!options.hide" :style="options.style" class="sunset-filter-field">
		<div :is="widget" :options="options" :value.sync="value" @search="fieldSearch" @ready="widgetReady"></div>
	</div>
</template>
<script>
	import widgets from '../widgets/filter-widgets.js';

	export default {
		components: widgets,
		props: {
			options: {
				type: Object
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
			}
		},
		methods: {
			fieldSearch() {
				this.$emit('search');
			},
			widgetReady(name, defaultValue) {
				this.$emit('ready', name, defaultValue);
			}
		},
		ready() {
			if (this.options.onChange || this.options.changeFilter) {
				this.$watch('value', (v, oldv) => {
					if (v === void 0) {
						this.value = '';
						return;
					}
					if (oldv === void 0 && v === '') {
						return;
					}
					this.options.onChange && this.options.onChange(v);
					this.options.changeFilter && this.$emit('search');
				});
			}
		}
	};
</script>