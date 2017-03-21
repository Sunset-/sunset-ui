<style lang="sass" rel="stylesheet/scss">
	@import '../style/index.scss';
	.sunset-header {
		height: 60px;
		.ivu-dropdown {
			float: right;
			margin-top: 15px;
			margin-right: 15px;
		}
		.avator-link {
			cursor: pointer;
			img {
				vertical-align: middle;
				border-radius: 50%;
			}
		}
	}
</style>
<template>
	<header class="sunset-header">
		<Dropdown @on-click="operate">
			<span class="avator-link">
				<img src="/assets/img/user-default.png" alt="user-image" class="img-circle img-inline userpic-32" width="28" /> {{nickName}}
				<Icon type="arrow-down-b"></Icon>
			</span>
			<Dropdown-menu slot="list">
				<Dropdown-item v-for="menu in menus" :divided="menu.divided" :key="$index">{{menu.title}}</Dropdown-item>
			</Dropdown-menu>
		</Dropdown>
	</header>
</template>
<script>
	export default {
		props: {
			currentUser: {
				default () {
					return {};
				}
			},
			menus: {}
		},
		computed: {
			nickName() {
				return this.currentUser && this.currentUser.nickname || '';
			}
		},
		data() {
			return {
				//快递表单
				passwordModalOptions: {
					options: {
						fields: [{
							label: '原密码',
							name: 'oldPwd',
							type: 'password',
							enum: 'expressCompany',
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '新密码',
							name: 'newPwd',
							type: 'password',
							validate: {
								required: true,
								maxlength: 32
							}
						}],
						method: 'updatePassword',
						format: (model) => {
							model.id = this.currentUser.id;
							return model;
						}
					},
					store: null //SignStore
				}
			}
		},
		methods: {
			showUpdatePassword() {
				this.$broadcast('MODEL_FORM_SHOW');
			},
			updatePassword() {

			},
			operate(index) {
				Sunset.isFunction(this.menus[index].operate) && this.menus[index].operate();
			}
		},
		ready() {
			//this.currentUser = SignStore.currentUserCache || {};
		}
	};
</script>