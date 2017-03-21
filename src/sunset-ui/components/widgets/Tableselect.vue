<template>
	<div :class="['sunset-field-wrap']">
		<label class="sunset-field-label">{{options.label}}</label>
		<div class="sunset-field">
			<i-input :value="text" @click="select" :placeholder="options.placeholder" :readonly="true">
				<i-button @click="select" slot="append">选择</i-button>
			</i-input>
		</div>
		<sunset-table-modal @submit="tableSelected" v-ref:tablemodal :options="options.modalOptions"></sunset-table-modal>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object
			},
			value: {}
		},
		data() {
			return {
				items: [],
				text_: ''
			};
		},
		computed: {
			multi() {
				return !!this.options.multi;
			},
			idKey() {
				return this.options.idKey || 'id';
			},
			nameKey() {
				return this.options.nameKey || 'name';
			},
			text: {
				set(v) {
					this.text_ = v;
				},
				get() {
					return this.text_ || this.options.getText(this.value);
				}
			}
		},
		methods: {
			select() {
				this.$refs.tablemodal.open(this.value && this.value.split(',').map(id => {
					var item = {};
					item[this.idKey] = id;
					item[this.nameKey] = this.options.getText(id);
					return item;
				}));
			},
			tableSelected(items) {
				var ids = [],
					names = [];
				items.forEach(item => {
					ids.push(item[this.idKey]);
					names.push(item[this.nameKey]);
				})
				this.value = this.options.object ? (this.multi ? items : items && items[0]) : ids.join(',');
				this.text = names.join(',');
				this.items = items;
				this.$refs.tablemodal.cancel();
			}
		},
		events: {
			REFRESH_WIDGET_VALUE() {
				this.text_ = '';
			}
		}
	};
</script>