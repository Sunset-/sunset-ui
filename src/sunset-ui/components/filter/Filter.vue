<style lang="sass">
	.sunset-search-form-container {
		display: inline-block;
		vertical-align: top;
		.sunset-search-form {
			display: inline-block;
			.search-form-button {
				margin-bottom: 0px;
			}
		}
		.sunset-search-form-tip {
			display: inline-block;
			float: right;
			margin-left: 10px;
			vertical-align: top;
			&>div {
				margin-bottom: 0px;
			}
		}
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}
</style>
<template>
	<div class="sunset-search-form-container">
		<form :class="['sunset-search-form form-inline form-horizontal',right?'pull-right':'']" onsubmit="return false">
			<filter-field v-for="field in fields" :options="field" :value.sync="filter[field.name]"></filter-field>
			<i-button v-if="searchButton" :type="searchButton.color||'primary'" :icon="searchButton.icon" @click="searchClick">{{searchButton.label}}</i-button>
			<sunset-toolbar v-if="options.toolbar" :options="options.toolbar"></sunset-toolbar>
		</form>
		<div class="sunset-search-form-tip" v-if="options.tip">
			<Alert :type="options.tip.color" show-icon>{{options.tip.text}}</Alert>
		</div>
	</div>
</template>
<script>
	import FilterField from './FilterField.vue';

	export default {
		components: {
			FilterField
		},
		props: {
			options: {}
		},
		computed: {
			fields() {
				return this.options && this.options.fields || [];
			},
			right() {
				return this.options && this.options.align == 'right';
			},
			searchButton() {
				return this.options && this.options.searchButton || '';
			}
		},
		data() {
			return {
				lock: false,
				filter: {}
			};
		},
		methods: {
			generateLocalFilter() {
				var localFilterFields = this.fields.filter(item => Sunset.isFunction(item.localFilter)) || [],
					data = Object.assign({}, this.filter);
				return function (record) {
					for (var i = 0, field; field = localFilterFields[i++];) {
						if (!field.localFilter.call(field, record, data[field.name])) {
							return false;
						}
					}
					return true;
				}
			},
			searchClick() {
				this.search();
			},
			reset(filter) {
				this.lock = true;
				//this.filter = filter ? JSON.parse(JSON.stringify(filter)) : {};
				this.filter = filter ? Object.assign({}, filter) : {};
				this.search();
				this.$nextTick(() => {
					this.lock = false;
				})
			},
			search() {
				var filter = Object.assign({}, this.filter);
				if (Sunset.isFunction(this.options.format)) {
					filter = this.options.format(filter) || filter;
				}
				this.$emit('filter', filter, this.generateLocalFilter());
			}
		},
		ready() {
			if (this.default) {
				Promise.resolve().then(() => {
					return Sunset.isFunction(this.default) ? this.default() : this.default;
				}).then(defaultModal => {
					this.reset(defaultModal);
				});
			}
		},
		events: {
			FIELD_SEARCH() {
				this.lock || this.search()
			},
			CRUD_TABLE_FILTER_RESET() {
				this.filter = {};
				this.search()
			}
		}
	}
</script>