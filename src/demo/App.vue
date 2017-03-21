<style lang="sass">
	@import '../sunset-ui/style/index.scss';
	$HEADER_HEIGHT :50px;
	$SIDEBAR_WIDTH: 180px;
	.sunset-ui-container {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		&>header {
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			height: $HEADER_HEIGHT;
			background: $info;
			&>.logo {
				color: #FFF;
				font-size: 24px;
				line-height: $HEADER_HEIGHT;
				padding-left: 20px;
			}
		}
		&>.major {
			position: absolute;
			top: $HEADER_HEIGHT;
			left: 0px;
			bottom: 0px;
			right: 0px;
			&>.sidebar {
				position: absolute;
				top: 0px;
				left: 0px;
				bottom: 0px;
				width: $SIDEBAR_WIDTH;
			}
			&>.content {
				position: absolute;
				top: 0px;
				left: $SIDEBAR_WIDTH;
				bottom: 0px;
				right: 0px;
				background: $background;
				&>.module {
					position: absolute;
					top: 20px;
					left: 20px;
					bottom: 20px;
					right: 20px;
					h2 {
						margin-bottom: 10px;
					}
					.component-wrap {
						border: 1px solid $info;
						margin-bottom: 10px;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="sunset-ui-container">
		<header>
			<div class="logo">
				Sunset-UI管理框架
			</div>
		</header>
		<div class="major">
			<div class="sidebar">
				<Menu :theme="theme3" :active-key="$route.path" width="100%">
					<Menu-item v-for="m in menus" :key="m.path" @click="go(m)">
						<Icon type="document-text"></Icon>
						{{m.title}}
					</Menu-item>
				</Menu>
			</div>
			<div class="content">
				<div class="module">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import modules from '../modules.js';

	export default {
		data() {
			return {
				menus: modules
			}
		},
		methods: {
			go(menu) {
				Router.go(menu.path);
			}
		},
		ready() {

		}
	}
</script>