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
		<div class="sunset-field-wrap">
			<label v-if="options.label" class="sunset-field-label">{{options.label}}</label>
			<div :is="widget" :options="options" :value.sync="value" @search="fieldSearch" @ready="widgetReady"></div>
		</div>
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

			},
			filter: {

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
			},
			generateWatchDependent(watchs) {
				var dep = {},
					filter = this.filter;
				watchs.split(',').forEach(w => {
					dep[w] = filter[w];
				});
				return dep;
			},
			rebuild(watchs, rebuild) {
				Promise.resolve().then(() => {
					return rebuild.call(this.options, this.generateWatchDependent(watchs), this.options, this.filter);
				}).then(res => {
					this.$children[0].init && this.$children[0].init();
				});
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
						this.$watch(`filter.${w}`, (v) => {
							this.rebuild(watchs, rebuild);
						});
					});
					this.rebuild(watchs, rebuild);
				}
			}
		}
	};
</script>