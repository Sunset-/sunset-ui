<style lang="sass">
	.editor-container {
		position: relative;
	}
</style>
<template>
	<div class="sunset-field editor-container">
		<div>
			<sunset-editor v-ref:editor :value.sync="value" :readonly="options.readonly" :toolbar="options.toolbar"></sunset-editor>
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
				width: 0,
				inited: false
			};
		},
		events: {
			REFRESH_WIDGET_VALUE() {
				if (!this.inited) {
					this.inited = true;
					this.$nextTick(() => {
						this.$refs.editor.setWidth($(this.$el).width() + 'px');
					});
				} else {
					this.value = '';
				}
				//this.$refs.editor.setValueSilent(this.value);
			}
		}
	};
</script>