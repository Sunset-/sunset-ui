<style lang="scss">
	.sunset-page{
		overflow:hidden;
		&.sunset-page-right{
			.ivu-page{
				float:right;
			}
		}
	}
</style>
<template>
	<div :class="['sunset-page',right?'sunset-page-right':'']">
		<Page :total.sync="total" :current="pageNumber" :page-size="pageSize||10" @on-change="changePageNumber" :size="size" :simple="simple"
						:show-total="showTotal" :show-elevator="showElevator" :show-sizer="showSizer"></Page>
	</div>
</template>
<script>
	export default {
		props: {
			right:{},
			total: {},
			pageNumber: {},
			pageSize: {},
			simple: {},
			size: {},
			showTotal: {},
			showElevator: {},
			showSizer: {}
		},
		methods: {
			changePageNumber(pageNumber) {
				this.$emit('change', pageNumber);
			}
		}
	}
</script>