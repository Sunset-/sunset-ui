<template>
	<div class="sunset-field">
		<i-input :value="text" @click="select" :placeholder="options.placeholder" :readonly="true">
			<i-button @click.stop="select" slot="append">选择</i-button>
		</i-input>
		<sunset-tree-modal v-if="inited" @submit="selected" v-ref:treemodal :options="options.modalOptions"></sunset-tree-modal>
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
				lock: false,
				inited: false
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
			init() {
				this.watchedValue(this.value);
			},
			select() {
				if (!this.inited) {
					this.inited = true;
					this.$nextTick(() => {
						this.$refs.treemodal.open(this.value);
					});
				} else {
					this.$refs.treemodal.open(this.value);
				}
			},
			selected(items) {
				this.lock = true;
				var ids = [],
					names = [];
				items.forEach(item => {
					ids.push(Sunset.getAttribute(item, this.idKey));
					names.push(Sunset.getAttribute(item, this.nameKey));
				});
				this.value = ids.join(this.spliter);
				this.text = names.join(',');
				this.$refs.treemodal.cancel();
				this.$nextTick(() => {
					this.lock = false;
				})
			},
			watchedValue(v) {
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
		},
		watch: {
			value(v) {
				this.watchedValue(v);
			}
		},
		ready() {
			this.init();
		}
	};
</script>