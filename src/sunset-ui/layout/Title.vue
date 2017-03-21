<style lang="sass">
	@import '../style/index.scss';
	.sunset-title {
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		font-weight: bold;
		padding-left: 20px;
		background: #f8f8f8;
		color: $dark;
		box-shadow: 0 1px 0 rgba(0, 1, 1, .08), inset 0 1px 0 #ededed;
	}
</style>
<template>
	<h1 class="sunset-title">{{title}}</h1>
</template>
<script>
	export default {
		props: {
			title: {

			},
			page: {

			}
		},
		computed: {
			module() {
				return Base.currentModule();
			}
		},
		methods: {
			go(page) {
				this.page = page;
			}
		}

	}
</script>