<template>
	<div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
		<label :class="['sunset-field-label',options.label?'':'sunset-field-label-empty']">{{options.label}}</label>
		<div class="sunset-field">
			<i-select :model.sync="widgetValue" :placeholder="options.placeholder" :clearable="options.clearable"
			    :multiple="options.multiple" :filterable="options.filterable">
				<template v-if="groupable">
					<Option-group v-for="group in items" :label="group.group">
						<i-option v-for="item in group.items" :value="item.value">{{ item.text }}</i-option>
					</Option-group>
				</template>
				<template v-if="!groupable">
					<i-option v-for="item in items" :value="item.value">{{ item.text }}</i-option>
				</template>
			</i-select>
		</div>
	</div>
</template>
<script>
	import Utils from '../Helper.js';

	export default {
		props: {
			options: {
				type: Object
			},
			value: {},
			invalid: {}
		},
		data() {
			return {
				groupable: false,
				items: [],
				widgetValue: [],
				lock: false
			};
		},
		computed: {
			spliter() {
				return this.options.spliter || ',';
			}
		},
		methods: {
			init() {
				Utils.generateItems(this.options).then(items => {
					var groups = {},
						others = [],
						groupable = false;
					items && items.forEach(item => {
						if (item.group) {
							groupable = true;
							(groups[item.group] || (groups[item.group] = [])).push(item);
						} else {
							others.push(item);
						}
					});
					if (this.groupable = groupable) {
						var groupItems = [];
						for (var g in groups) {
							if (groups.hasOwnProperty(g)) {
								groupItems.push({
									group: g,
									items: groups[g]
								});
							}
						}
						others.length && groupItems.push({
							group: '其他',
							items: others
						});
						this.items = groupItems;
					} else {
						this.items = items;
					}
					if (this.options.defaultFirst && this.value === void 0) {
						this.value = this.items[0].group ? this.items[0].items[0].value : this.items[0].value;
					}
					this.$emit('ready', this.options.name);
				});
			}
		},
		ready() {
			this.init();
		},
		watch: {
			widgetValue(v) {
				this.$nextTick(() => {
					this.lock = true;
					if (Sunset.isArray(v)) {
						this.value = v.length ? v.join(this.spliter) : '';
					} else {
						this.value = v;
					}
					this.$nextTick(() => {
						this.lock = false;
					});
				});
			},
			value(v) {
				if (!this.lock) {
					if (this.options.multiple) {
						if (Sunset.isArray(v)) {
							this.widgetValue = v;
						} else {
							this.widgetValue = (v || '').split(this.spliter);
						}
					} else {
						this.widgetValue = v;
					}
				}
			}
		}
	};
</script>