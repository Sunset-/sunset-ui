<style lang="sass">
	@import '../style/index.scss';
	.sunset-layout-content {
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		top: 30px;
		padding: 15px;
		background: #eeeeee;
		overflow-x: hidden;
		overflow-y: auto;
		.title {
			font-size: 18px;
			margin-bottom: 10px;
		}
		.left-major,
		.right-major {
			position: absolute;
			width: 48%;
			top: 0px;
			bottom: 0px;
			margin: 20px;
			padding: 20px;
			background: #FFF;
			overflow-x: auto;
			overflow-y: hidden;
		}
		.left-major {
			left: 0px;
		}
		.right-major {
			right: 0px;
		}
		.leftside {
			position: absolute;
			width: 300px;
			top: 15px;
			bottom: 15px;
			padding: 15px;
			background: #FFF;
		}
		.right-content {
			position: absolute;
			left: 325px;
			top: 15px;
			bottom: 15px;
			right: 15px;
			padding: 15px;
			background: #FFF;
		}
	}
</style>
<!-- 简单数据表布局 -->
<template>
	<sunset-title :title="title" :page.sync="PAGE"></sunset-title>
	<!-- 简单数据表布局 -->
	<template v-if="layoutType=='content'">
		<div class="sunset-layout-content">
			<slot></slot>
		</div>
		</div>
	</template>
	<!-- 左右等分布局 -->
	<template v-if="layoutType=='left-right'">
		<div class="sunset-layout-content">
			<div class="left-major">
				<slot name="left"></slot>
			</div>
			<div class="right-major">
				<slot name="right"></slot>
			</div>
		</div>
		</div>
	</template>
	<!-- 左窄右宽布局 -->
	<template v-if="layoutType=='leftside-content'">
		<div class="sunset-layout-content">
			<div class="leftside" :style="{width:leftWidth}">
				<slot name="leftside"></slot>
			</div>
			<div class="right-content" :style="{left:rightLeft}">
				<slot name="content"></slot>
			</div>
		</div>
		</div>
	</template>
</template>
<script>
	import SunsetTitle from './Title';

	const type = {
		'content': 'content',
		'leftside-content': 'leftside-content',
		'left-right': 'left-right'
	};

	export default {
		components: {
			SunsetTitle
		},
		props: {
			title: {
				type: String
			},
			type: {},
			leftSize: {}
		},
		data() {
			return {
				PAGE: 'CRUD_TABLE'
			}
		},
		computed: {
			layoutType() {
				return type[this.type] || 'content';
			},
			leftWidth() {
				var leftSize = this.leftSize;
				return `${leftSize||300}px`;
			},
			rightLeft() {
				var leftSize = this.leftSize;
				return `${(+leftSize||300)+25}px`;
			}
		}
	};
</script>