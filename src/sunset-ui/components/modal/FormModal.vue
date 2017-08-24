<style lang="sass">
	.sunset-form-modal {
		.ivu-modal-body {
			padding: 0px;
			&>div {
				padding: 10px;
			}
		}

		&.nofoot {
			.ivu-modal-footer {
				display: none;
			}
		}
	}
</style>
<template>
	<Modal :class-name="'sunset-form-modal '+(options.toolbar===false?'nofoot':'')" :visible.sync="visible" :title="options.title"
	    :width="width">
		<div :style="options.style">
			<sunset-form v-ref:form :options="options.formOptions" @signal="operateSignal"></sunset-form>
		</div>
		<div slot="footer">
			<sunset-toolbar v-if="toolbar" :options="toolbar"></sunset-toolbar>
		</div>
	</Modal>
</template>
<script>
	//事件
	//saved：保存成功
	//error：保存失败
	//cancel：取消

	export default {
		components: {},
		props: {
			options: {
				//width : 模态窗宽度，数字
				//okText : 确定文字
				//cancelText ：取消文字
				//formOptions : 表单配置（见sunset-form）
				//toolbar : 底部工具栏（false时隐藏底部foot,配置见sunset-toolbar）
			}
		},
		data() {
			return {
				visible: false,
				modal_loading: false
			}
		},
		computed: {
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
			},
			width() {
				return this.options.width || 700;
			}
		},
		methods: {
			open(model) {
				this.$refs.form.reset(model);
				this.visible = true;
			},
			ok() {
				this.modal_loading = true;
				this.$refs.form.submit();
			},
			cancel() {
				this.visible = false;
				this.modal_loading = false;
				this.$emit('cancel');
			},
			operateSignal(signal, res, model) {
				switch (signal) {
					case 'SAVED':
						this.cancel();
						this.$emit('saved', res, model);
						break;
					case 'SAVE-ERROR':
						this.modal_loading = false;
						this.$emit('error');
						break;
					case 'CANCEL':
						this.cancel();
						break;
				}
			}
		}
	};
</script>