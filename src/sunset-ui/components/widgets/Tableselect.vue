<template>
	<div :class="['sunset-field-wrap']">
		<label class="sunset-field-label">{{options.label}}</label>
		<div class="sunset-field">
			<i-input :value="text" @click="select" :placeholder="options.placeholder" :readonly="true">
				<i-button @click.stop="select" slot="append">选择</i-button>
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
				text: '',
				lock: false
			};
		},
		computed: {
			idKey() {
				return this.options.idKey || 'id';
			},
			nameKey() {
				return this.options.nameKey || 'name';
			},
			spliter() {
				return this.options.spliter || ',';
			}
		},
		methods: {
			select() {
				Promise.resolve().then(() => {
					if (this.value) {
						var texts = this.text.split(',');
						return this.value.split(',').map((id, index) => {
							var item = {};
							item[this.idKey] = id;
							item[this.nameKey] = texts[index];
							return item;
						});
					}
				}).then(checkeds => {
					this.$refs.tablemodal.open(checkeds);
				});
			},
			tableSelected(items) {
				this.lock = true;
				var ids = [],
					names = [];
				items.forEach(item => {
					ids.push(Sunset.getAttribute(item, this.idKey));
					names.push(Sunset.getAttribute(item, this.nameKey));
				});
				this.value = ids.join(this.spliter);
				this.text = names.join(',');
				this.$refs.tablemodal.cancel();
				this.$nextTick(() => {
					this.lock = false;
				})
			}
		},
		watch: {
			value(v) {
				if (!this.lock) {
					var text;
					if (v && this.options.transcode) {
						Promise.resolve(this.options.transcode(v.split(this.spliter))).then(text => {
							if (Sunset.isArray(text)) {
								this.text = text.join(',');
							} else {
								this.text = text || '';
							}
						});
					} else {
						this.text = '';
					}
				}
			}
		}
	};
</script>