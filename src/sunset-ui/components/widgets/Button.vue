<style lang="sass">
	.sunset-widget-button-wrap {
		display: inline-block;
	}
</style>
<template>
	<div class="sunset-field">
		<template v-if="options.dom">
			<div :style="options.style" class="sunset-widget-button-wrap" @click="onClick">
				{{{options.dom}}}
			</div>
		</template>
		<template v-if="!options.dom">
			<i-button :style="options.style" :type="options.color||options.type||'primary'" :loading="options.loading" :size="options.size" :shape="options.shape"
			    :icon="options.icon" @click="operate()">{{options.text}}</i-button>
		</template>

	</div>
</template>
<script>
	export default {
		props: {
			formOptions: {

			},
			options: {
				type: Object
			},
			value: {},
			model: {},
			invalid: {}
		},
		data() {
			return {};
		},
		computed: {

		},
		methods: {
			operate() {
				Sunset.isFunction(this.options.operate) && this.options.operate.call(this.options, this.model, this.options, this.formOptions);
			},
			onClick(ev) {
				Sunset.isFunction(this.options.operate) && this.options.operate.call(this.options, this.model, this.options, this.formOptions,
					ev);
			}
		}
	};
</script>