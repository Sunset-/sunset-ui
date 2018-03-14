<style>
	.switch-group-wrap {
		min-height: 32px;
	}

	.switch-group-wrap .ivu-switch {
		position: relative;
	}
</style>
<template>
	<div class="sunset-field switch-group-wrap">
		<Switch :checked.sync="value" :disabled="options.disabled" :size="options.size">
			<span v-if="options.open" slot="open">{{options.open}}</span>
			<span v-if="options.close" slot="close">{{options.close}}</span>
		</Switch>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object
			},
			value: {
				type: Boolean
			}
		},
		data() {
			return {};
		},
		computed: {}
	};
</script>