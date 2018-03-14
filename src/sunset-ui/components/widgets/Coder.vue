<style lang="scss">
	.editor-container {
		position: relative;
	}
</style>
<template>
	<div class="sunset-field editor-container">
		<div>
			<sunset-coder ref="editor" :height="options.height" :value.sync="inputValue" :readonly="options.readonly" :options="options"></sunset-coder>
		</div>
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
				inputValue: ''
			};
		},
		methods: {
			init() {
				this.valueToInputValue(this.value);
			},
			slientRefreshValue() {
				this.$nextTick(() => {
					this.lock = true;
					this.value = this.inputValue;
					this.$nextTick(() => {
						this.lock = false;
					});
				});
			},
			valueToInputValue(v) {
				v = (v === void 0 || v === null) ? '' : (v + '');
				if (!this.lock) {
					this.inputValue = v;
				}
			}
		},
		watch: {
			inputValue(v) {
				this.slientRefreshValue();
			},
			value(v) {
				this.valueToInputValue(v);
			}
		},
		mounted(){
			this.init();
		}
	};
</script>