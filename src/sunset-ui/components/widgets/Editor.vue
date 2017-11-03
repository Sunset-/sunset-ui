<style lang="sass">
	.editor-container {
		position: relative;
	}
</style>
<template>
	<div class="sunset-field editor-container">
		<div>
			<sunset-editor v-ref:editor :height="options.height" :value.sync="value" :readonly="options.readonly" :toolbar="options.toolbar"
			    @focus="focus" @blur="blur"></sunset-editor>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object
			},
			value: {},
			model: {

			}
		},
		data() {
			return {
				width: 0,
				inited: false
			};
		},
		methods: {
			focus() {
				if (Sunset.isFunction(this.options.focus)) {
					this.options.focus.call(this.options, this.value, this.model);
				}
			},
			blur() {
				if (Sunset.isFunction(this.options.blur)) {
					this.options.blur.call(this.options, this.value, this.model);
				}
			}
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