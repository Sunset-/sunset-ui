<style lang="sass">
	.search-form-group {
		.ivu-input-wrapper {
			margin-top: -2px;
			.ivu-input {
				border-radius: 4px 0px 0px 4px !important;
			}
		}
	}
</style>
<template>
	<div class="form-group search-form-group">
		<i-input :value.sync="value" @keydown="keydown($event)" :placeholder="options.placeholder" :maxlength="maxlength">
			<i-button @click="search" slot="append" icon="ios-search"></i-button>
		</i-input>
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
			return {};
		},
		computed: {
			type() {
				return this.options.type == 'input' ? 'text' : this.options.type;
			},
			maxlength() {
				return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options.validate.maxlength
					.rule;
			}
		},
		methods: {
			search() {
				this.$emit('search');
			},
			keydown(ev) {
				if (ev.keyCode == 13) {
					this.$emit('FIELD_SEARCH');
				}
			}
		}
	};
</script>