<style>
	.switch-group-wrap {
		min-height: 32px;
	}
	.switch-group-wrap .ivu-switch {
		position: relative;
		top: 5px;
	}
</style>
<template>
	<div :class="['sunset-field-wrap switch-group-wrap',invalid?'field-invalid':'']">
		<label class="sunset-field-label">{{options.label}}</label>
		<div class="sunset-field">
			<Switch :checked.sync="value" :disabled="options.disabled" :size="options.size">
				<span v-if="options.open" slot="open">{{options.open}}</span>
				<span v-if="options.close" slot="close">{{options.close}}</span>
			</Switch>
		</div>
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