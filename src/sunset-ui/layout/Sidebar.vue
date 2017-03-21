<style lang="sass">
	.sunset-sidebar {
		height: 100%;
		display: table-cell;
		position: relative;
		width: 240px;
		background: #2c2e2f;
		z-index: 1;
		.side-toggler {
			position: absolute;
			bottom: 0px;
			left: 0px;
			right: 0px;
			text-align: center;
			padding: 5px 0px;
			cursor: pointer;
			&:hover {
				color: #cdcdcd;
			}
		}
		.sidebar-menu-inner {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
		}
		.logo-env {
			display: block;
			padding: 25px 35px;
			border-bottom: 1px solid #313437;
			&:before {
				content: " ";
				display: table;
			}
			&:after {
				content: " ";
				display: table;
				clear: both;
			}
			.logo {
				float: left;
				&:after {
					content: " ";
					display: table;
					clear: both;
				}
				.logo-text {
					float: left;
					color: #40bbea;
					font-size: 23px;
				}
			}
		}
		.main-menu {
			padding-left: 30px;
			padding-right: 30px;
			margin-top: 15px;
			margin-bottom: 15px;
			list-style: none;
			.ivu-icon {
				vertical-align: middle;
				width: 22px;
				text-align: center;
			}
			li {
				&.has-sub>a:before {
					position: relative;
					display: inline-block;
					font-family: FontAwesome;
					content: '\F107';
					float: right;
					color: #6d747a;
					margin-left: 10px;
					-webkit-transform: rotate(-90deg);
					transform: rotate(-90deg);
					-webkit-transition: all .15s ease-in-out;
					transition: all .15s ease-in-out;
				}
				&.has-sub.expanded>a:before {
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
				}
			}
			a {
				color: #979898;
				text-decoration: none;
				display: block;
				padding: 13px 5px;
				border-bottom: 1px solid #313437;
				-webkit-transition: all .22s ease-in-out;
				transition: all .22s ease-in-out;
				&>span {
					display: inline-block;
				}
				&:hover {
					color: #FFF;
				}
			}
			ul {
				display: block;
				display: none;
				margin: 0;
				padding: 0;
				overflow: hidden;
				list-style: none;
				li {
					position: relative;
					opacity: 1;
					margin-left: 0px;
					a {
						padding-left: 35px;
					}
					&.active {
						a {
							color: #fff;
						}
					}
				}
			}
		}
		.mini-main-menu {
			&>li {
				position: relative;
				&>div {
					display: block;
					width: 50px;
					height: 50px;
					text-align: center;
					line-height: 50px;
					font-size: 30px;
					color: #40bbea;
					&:hover {
						background: #414446;
					}
					&:hover>ul {
						display: block;
					}
				}
				ul {
					position: absolute;
					left: 50px;
					top: 0px;
					width: 120px;
					display: none;
					li {
						height: 50px;
						line-height: 50px;
						font-size: 14px;
						background: #2c2e2f;
						a {
							display: block;
							color: #40bbea;
						}
						&:hover {
							background: #414446;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="sunset-sidebar sidebar-menu toggle-others fixed">
		<div class="sidebar-menu-inner" v-show="theme=='normal'">
			<header class="logo-env">
				<!-- logo -->
				<div class="logo">
					<span class="logo-text">{{logo}}</span>
				</div>
			</header>
			<ul id="main-menu" class="main-menu">
				<li v-permission="menu.permission" :id="menu.id" v-for="menu in menus" :class="{'has-sub':menu.subMenus,expanded : openedMenu==menu}">
					<a :class="'menu-'+$index" href="javascript:;" @click="toggleMenu(menu,$index,true)">
						<Icon v-if="menu.icon" :type="menu.icon" :size="20"></Icon>
						<span class="title">{{menu.title}}</span>
					</a>
					<ul v-if="menu.subMenus">
						<li v-for="subMenu in menu.subMenus" v-permission="subMenu.permission" :class="{'active':activeMenu==subMenu}">
							<a href="javascript:;" @click="go(subMenu.path)">
								<Icon v-if="subMenu.icon" :type="subMenu.icon" :size="20"></Icon>
								<span class="title">{{subMenu.title}}</span>
							</a>
						</li>
					</ul>
				</li>
			</ul>
			<div class="side-toggler" @click="toggleMenuType">
				<Icon type="chevron-left" size="26"></Icon>
			</div>
		</div>
		<div class="sidebar-menu-inner" v-show="theme=='mini'">
			<ul class="mini-main-menu">
				<li v-permission="menu.permission" :id="menu.id" v-for="menu in menus" :class="{'has-sub':menu.subMenus,expanded : openedMenu==menu}">
					<div :class="'mini-menu-'+$index" href="javascript:;" @click="toggleMenu(menu,$index,true)">
						<Icon v-if="menu.icon" :type="menu.icon"></Icon>
						<ul v-if="menu.subMenus">
							<li v-for="subMenu in menu.subMenus" v-permission="subMenu.permission" :class="{'active':activeMenu==subMenu}">
								<a href="javascript:;" @click="go(subMenu.path)">
									<Icon v-if="subMenu.icon" :type="subMenu.icon" :size="20"></Icon>
									<span class="title">{{subMenu.title}}</span>
								</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
			<div class="side-toggler" @click="toggleMenuType">
				<Icon type="chevron-right" size="26"></Icon>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			logo: {},
			menus: {}
		},
		data() {
			return {
				theme: 'normal',
				leftWidth: {
					normal: 240,
					mini: 50
				},
				subMenuHeight: 47,
				openedMenu: null,
				activeMenu: null,
				hideMenu: {}
			}
		},
		computed: {
			sideStyle() {
				return {
					'width': this.theme == 'normal' ? '300px' : '30px'
				};
			}
		},
		methods: {
			removeMenu(menu) {
				$(`#${menu}`).remove();
			},
			toggleMenu(menu, index, toggle) {
				var $subMenu = $(`.menu-${index} + ul`);
				if ($subMenu.length) {
					if (this.openedMenu != menu) {
						if (this.openedMenu) {
							this.closeSubMenu(this.openedMenu.$subMenu);
						}
						this.openedMenu = menu;
						this.openSubMenu(menu.$subMenu = $subMenu);
					} else if (toggle) {
						this.closeSubMenu(this.openedMenu.$subMenu);
						this.openedMenu = null;
					}
				} else {
					this.activeMenu = menu;
					this.go(menu.path);
				}
			},
			activeSubMenu(subMenu) {
				this.activeMenu = subMenu;
			},
			openSubMenu($subMenu) {
				var subMenuHeight = $subMenu.children().length * this.subMenuHeight + 'px';
				$subMenu.css({
					height: 0
				}).show().animate({
					height: subMenuHeight
				}, 200);
				var $lis = $subMenu.children().css({
					opacity: 0,
					marginLeft: '-20px'
				});
				$lis.each((index, item) => {
					setTimeout(() => {
						$(item).animate({
							opacity: 1,
							marginLeft: '0px'
						}, 300);
					}, 80 * index);
				});
			},
			closeSubMenu($subMenu) {
				var subMenuHeight = $subMenu.outerHeight();
				$subMenu.animate({
					height: 0
				}, 200, function () {
					$subMenu.hide().css({
						height: subMenuHeight
					});
				});
				var $lis = $subMenu.children().css({
					opacity: 1,
					marginLeft: '0px'
				});
				$lis.each((index, item) => {
					setTimeout(() => {
						$(item).animate({
							opacity: 0,
							marginLeft: '-20px'
						}, 300);
					}, 80 * index);
				});
			},
			go(path) {
				Router.go(path);
			},
			init() {
				var path = this.$route.path;
				this.menus.forEach((menu, index) => {
					if (menu.path === path) {
						this.toggleMenu(menu, index);
					} else if (menu.subMenus) {
						menu.subMenus.forEach((subMenu) => {
							if (subMenu.path == path) {
								this.toggleMenu(menu, index);
								this.activeSubMenu(subMenu);
							}
						});
					}
				});
			},
			toggleMenuType() {
				this.theme = this.theme == 'normal' ? 'mini' : 'normal';
				this.$emit('change', this.leftWidth[this.theme]);
			}
		},
		ready() {
			this.init();
		},
		created() {
			//将路径解析挂载到Base中
			Base.currentModule = () => {
				if (this.activeMenu) {
					return {
						title: this.activeMenu.title,
						icon: this.activeMenu.icon
					};
				}
				return {};
			};
			//路由监听
			Router.afterEach(() => {
				this.init();
			});
		}
	};
</script>