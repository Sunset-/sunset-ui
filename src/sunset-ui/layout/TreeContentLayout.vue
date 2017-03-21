<style lang="sass">
	$treeWrapWidth: 240px;
	.sunset-layout-tree-content {
		position: absolute;
		bottom: 20px;
		left: 20px;
		right: 20px;
		top: 125px;
		.sunset-layout-tree {
			position: absolute;
			top: 0px;
			left: 0px;
			width: 240px;
			bottom: 0px;
			margin-bottom: 0px;
			&.panel {
				padding: 15px;
				.panel-heading {
					padding-bottom: 5px;
				}
			}
			.left-tree-container {
				position: absolute;
				bottom: 5px;
				top: 55px;
				left: 10px;
				right: 10px;
				overflow: auto;
			}
		}
		.sunset-layout-table {
			margin-left: $treeWrapWidth+20px;
			height: 100%;
			overflow: auto;
			background: #FFF;
		}
	}
</style>
<!-- 左侧树，右侧数据表布局 -->
<template>
	<sunset-title :title="title" :page.sync="PAGE"></sunset-title>
	<div class="sunset-layout-tree-content">
		<div class="sunset-layout-tree panel panel-default">
			<div class="panel-heading">
				<slot name="treeToolbar"></slot>
			</div>
			<div class="left-tree-container">
				<slot name="tree"></slot>
			</div>
		</div>
		<div class="sunset-layout-table">
			<div class="wrapper-t-no">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>
<script>

	import SunsetTitle from '../Title';

	export default {
		components : {
			SunsetTitle
		},
		props : {
			title:{
				type : String
			}
		},
		data(){
			return {
			};
		}
	};

</script>