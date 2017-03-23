<style lang="sass">
	.sunset-tree-modal {
		&.nofoot {
			.ivu-modal-footer {
				display: none;
			}
		}
		.crud-tree-selector-content {
			min-height: 300px;
		}
	}
</style>
<template>
	<Modal :class-name="'sunset-tree-modal '+(options.toolbar===false?'nofoot':'')" :visible.sync="visible" :title="options.title"
	    :width="width">
		<div :style="options.style">
			<sunset-tree v-ref:tree :options="options.treeOptions" :nodes="options.treeNodes" @inited="treeInited" @checked="treeChecked"></sunset-tree>
		</div>
		<div slot="footer">
			<sunset-toolbar v-if="toolbar" :options="toolbar"></sunset-toolbar>
		</div>
	</Modal>
</template>
<script>
	export default {
		components: {},
		props: {
			visible: {},
			options: {}
		},
		data() {
			return {
				modal_loading: false,
				checkeds: [],
				checkedIds: ''
			}
		},
		computed: {
			width() {
				return this.options.width || 700;
			},
			toolbar() {
				return this.options.toolbar || [{
					label: this.options.cancelText || '取消',
					color: 'ghost',
					operate: () => {
						this.cancel();
					}
				}, {
					label: this.options.okText || '确定',
					color: 'success',
					loading: this.modal_loading,
					operate: () => {
						this.ok();
					}
				}]
			}
		},
		methods: {
			open(checkedIds) {
				this.checkedIds = (Sunset.isArray(checkedIds) ? checkedIds.join(',') : checkedIds) || ''
				this.$refs.tree.init();
				this.visible = true;
			},
			treeInited() {
				this.$refs.tree.refreshChecked(this.checkedIds);
			},
			treeChecked(checkeds) {
				this.checkeds = checkeds;
			},
			ok() {
				this.loading(true);
				this.$emit('submit', this.checkeds);
			},
			loading(flag) {
				this.modal_loading = !!flag;
			},
			cancel() {
				this.visible = false;
				this.modal_loading = false;
				this.$emit('cancel');
			}
		}
	};
</script>