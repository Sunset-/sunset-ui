<style lang="scss">
	.sunset-editor-container {
		width: 100%;
		.edui-editor {
			z-index: 800 !important;
		}
		.edui-editor-bottomContainer {
			display: none;
		}
		&.sunset-editor-readonly {
			.edui-editor-toolbarbox {
				display: none;
			}
		}
	}
</style>
<template>
	<div :class="['sunset-editor-container',readOnly?'sunset-editor-readonly':'']">
		<script :id="id" type="text/plain">
			我是编辑器
		</script>
	</div>
</template>
<script>
	var uid = 0;

	export default {
		props: {
			toolbar: {

			},
			value: {

			},
			height: {

			},
			readonly: {

			},
			options : {

			}
		},
		data() {
			return {
				id: '',
				waitValue: null,
				ready: false,
				pending: false
			};
		},
		computed: {
			readOnly() {
				return this.readonly === true || this.readonly === "";
			}
		},
		methods: {
			init() {
				if (!UE) {
					throw new Error('请装载UEditor组件');
				}
				this.ready = false;
				this.id = `sunset-editor-${++uid}`;
				this.$nextTick(() => {
					//挂载插件
					var opts = Object.assign({
						initialContent: '',
						saveInterval: 9999999999
					},this.options||{});
					if (this.toolbar) {
						opts.toolbars = [this.toolbar.split(',').map((item) => item.trim())];
					}
					var editor = this.editor = UE.getEditor(this.id, opts);
					//初始化值
					editor.ready(() => {
						if (this.height && !isNaN(+this.height)) {
							editor.setHeight(+this.height);
						}
						editor.setContent(this.waitValue || '');
						this.ready = true;
						//监听
						editor.addListener('contentChange', () => {
							this.pending || this.setValueSilent(editor.getContent());
						});
						editor.addListener('blur', () => {
							this.value = editor.getContent();
							this.$emit('blur');
						});
						editor.addListener('focus', () => {
							this.$emit('focus');
						});
						//只读
						if (this.readOnly) {
							editor.setDisabled();
						} else {
							editor.setEnabled();
						}
						this.initWidgetValue(this.value);
					});
				});
			},
			initWidgetValue(v) {
				if (!this.pending) {
					if (this.ready) {
						this.editor && this.editor.setContent(v || '');
						this.editor && this.editor.focus(true);
					} else {
						this.waitValue = v;
					}
				}
			},
			setValueSilent(value) {
				this.pending = true;
				this.value = value;
				this.$nextTick(() => {
					this.pending = false;
				})
			},
			setWidth(w) {
				$(`#${this.id} .edui-editor`).css('width', w);
			},
			getEditor() {
				return this.editor;
			}
		},
		mounted(){
			this.init();
		},
		watch: {
			value(v) {
				this.initWidgetValue(v);
			},
			readonly(v) {
				try {
					//只读
					if (!!v) {
						this.editor && this.editor.setDisabled();
					} else {
						this.editor && this.editor.setEnabled();
					}
				} catch (e) {
					console.warn(e);
				}
			}
		}
	};
</script>