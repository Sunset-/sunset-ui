<template>
	<sunset-layout title="Sunset组件库 - CRUD">
		<h4 class="wrapper-y-md">CRUD</h4>
		<div style="border:1px solid #09c;">
			<sunset-crud :options="options"></sunset-crud>
		</div>
	</sunset-layout>
</template>
<script>
	import CrudStore from './BootstrapStore';

	const now = new Date().getTime();

	export default {
		methods: {
			test() {
				var clear = Sunset.confirm({
					content: '确定删除此条目',
					loading: true,
					onOk: () => {
						setTimeout(clear, 3000);
					}
				});
			},
			filter(a, b) {
				debugger;
			},
			save(model) {
				debugger;
			}
		},
		data() {
			return {
				options: {
					title: '管理账户',
					store: CrudStore,
					//工具
					toolsOptions: [{
						label: '新增',
						icon: 'glyphicon glyphicon-plus',
						color: 'success',
						permission: 'SYSTEM_MANAGER_DICTIONARY_ADD',
						operate: 'CRUD_OPERATE_ADD'
					}, {
						label: '修改',
						icon: 'glyphicon glyphicon-edit',
						color: 'info',
						permission: 'SYSTEM_MANAGER_DICTIONARY_ADD',
						operate: 'CRUD_OPERATE_ADD'
					}, {
						label: '上传',
						icon: 'glyphicon glyphicon-upload',
						color: 'info',
						type: 'file',
						permission: 'SYSTEM_MANAGER_DICTIONARY_ADD',
						operate: 'CRUD_OPERATE_ADD',
						url: '/service/common/upload',
						data: {
							keyword: 1
						},
						onSuccess(res) {
							debugger;
						}
					}],
					//搜索
					filterOptions: {
						align: 'right',
						fields: [{
							name: 'select',
							widget: 'select',
							placeholder: '下拉',
							defaultFirst: true,
							// changeFilter :true,
							data: {
								'1': '男',
								'2': '女'
							},
							style: 'width:120px;'
						}, {
							name: 'date',
							widget: 'date',
							type: 'daterange',
							placeholder: '开始时间',
							style: 'width:240px;'
						}, {
							name: 'keyword',
							widget: 'search',
							placeholder: '管理账户类型'
						}],
						format: function (filter) {

						},
						searchButton: {
							label: '查询'
						}
					},
					//表格
					tableOptions: {
						columns: [{
							title: '登录名',
							name: 'account'
						}, {
							title: '昵称',
							name: 'nickname',
							sortable: false
						}, {
							title: '类型',
							name: 'type',
							format: 'MONEY'
						}],
						showIndex: true,
						pageSize: 5,
						localPage: false,
						multiCheck: true,
						sortable: true,
						lazy: true,
						format: {
							list: 'rows',
							count: 'count',
							pageSize: 'pageSize',
							currentPage: 'pageNumber'
						},
						//表格工具栏
						toolbar: [{
							label: '新增',
							icon: 'glyphicon glyphicon-plus',
							color: 'success',
							permission: 'SYSTEM_MANAGER_DICTIONARY_ADD',
							signal: 'ADD'
						}, {
							label: '上传',
							icon: 'glyphicon glyphicon-upload',
							color: 'info',
							type: 'file',
							permission: 'SYSTEM_MANAGER_DICTIONARY_ADD',
							operate: 'CRUD_OPERATE_ADD',
							url: '/service/common/upload',
							data: {
								keyword: 1
							},
							onSuccess(res) {
								debugger;
							}
						}],
						//表格搜索
						filter: {
							align: 'right',
							fields: [{
								label: '下拉',
								name: 'select',
								widget: 'select',
								placeholder: '下拉',
								data: {
									'1': '男',
									'2': '女'
								},
								style: 'width:120px;'
							}, {
								label: '时间',
								name: 'date',
								widget: 'date',
								type: 'daterange',
								placeholder: '开始时间',
								style: 'width:240px;'
							}, {
								label: '搜索',
								name: 'keyword',
								widget: 'search',
								placeholder: '管理账户类型',
								//本地搜索
								localFilter: function (record, v) {
									return ~record.account.indexOf(v);
								}
							}],
							format: function (filter) {
								return {
									keyword: filter.keyword
								};
							},
							searchButton: ''
						},
						//数据条目操作
						recordTools: [{
							label: '修改',
							icon: 'refresh',
							color: 'warning',
							permission: 'SYSTEM_MANAGER_DICTIONARY_UPDATE',
							signal: 'MODIFY'
						}, {
							label: '删除',
							icon: 'glyphicon glyphicon-remove',
							color: 'error',
							permission: 'SYSTEM_MANAGER_DICTIONARY_DELETE',
							signal: 'DELETE'
						}],
						store: CrudStore
					},
					//表格表单
					formOptions: {
						cols: 3,
						store: CrudStore,
						fields: [{
							label: '登录名',
							name: 'account',
							widget: 'input',
							default: '123456',
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '密码',
							name: 'password',
							widget: 'input',
							default: 'aaa',
							newline: true,
							premise(model) {
								return !model.id;
							},
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '昵称',
							name: 'nickname',
							widget: 'input',
							newline: true,
							validate: {
								required: true,
								maxlength: 32
							}
						}, {
							label: '类型',
							name: 'type',
							widget: 'radio',
							valuePlace: 'key',
							textPlace: 'value',
							newline: true,
							enum: 'ACCOUNT_TYPE',
							// data: () => {
							// 	return new Promise(resolve => {
							// 		setTimeout(() => {
							// 			resolve(Sunset.Service.Dictionary.getEnums('ACCOUNT_TYPE'))
							// 		}, 5000)
							// 	});
							// },
							defaultFirst: true,
							dataType: String,
							validate: {
								required: true
							}
						}],
						format: (model) => {
							return model;
						},
						validate: (model) => {
							return true;
						},
						tools: null
					},
					//组件表单
					fullFormOptions: {
						cols: 3,
						fields: [{
								group: '基本信息',
								label: '登录名为',
								name: 'account1',
								widget: 'input',
								type: 'input',
								placeholder: "不能为空",
								validate: {
									required: true,
									maxlength: 32
								}
							}, {
								label: '登录名',
								name: 'account2',
								widget: 'input',
								type: 'input',
								placeholder: "不能为空",
								validate: {
									required: true,
									maxlength: 32
								}
							}, {
								label: '登录名',
								name: 'account3',
								widget: 'input',
								type: 'input',
								placeholder: "不能为空",
								validate: {
									required: true,
									maxlength: 32
								}
							}, {
								label: '密码',
								name: 'password',
								widget: 'input',
								type: 'password',
								validate: {
									required: true,
									maxlength: 32
								}
							}, {
								label: '单选',
								name: 'sex',
								widget: 'radio',
								enum: 'ManagerType',
								validate: {
									required: true
								}
							}, {
								label: '下拉框1',
								name: 'select1',
								widget: 'select',
								enum: 'ManagerType',
								validate: {
									required: true
								}
							}, {
								label: '下拉框2',
								name: 'select2',
								widget: 'select',
								//enum: 'ManagerType',
								watch: 'select1',
								rebuild(dep) {
									if (dep && dep.select1 == '1') {
										this.enum = 'ManagerType';
										this.data = null;
										this.validate = {
											required: true
										}
									} else {
										this.data = {
											c: '成人',
											d: '儿童'
										};
										this.validate = null
									}
								},
								data: {
									a: '男',
									b: '女'
								},
								validate: {
									required: true
								}
							}, {
								group: '扩展信息',
								label: '分组下拉',
								name: 'groupSelect',
								widget: 'select',
								textPlace: 'label',
								clearable: true,
								multiple: true,
								filterable: true,
								placeholder: "请选择城市",
								data: [{
									value: 'beijing',
									group: '热门城市',
									label: '北京市'
								}, {
									value: 'shanghai',
									group: '热门城市',
									label: '上海市'
								}, {
									value: 'shenzhen',
									group: '热门城市',
									label: '深圳市'
								}, {
									value: 'hangzhou',
									label: '杭州市'
								}, {
									value: 'nanjing',
									label: '南京市'
								}, {
									value: 'chongqing',
									label: '重庆市'
								}],
								validate: {
									required: true
								}
							}, {
								label: '复选框',
								name: 'checkbox',
								widget: 'Checkbox',
								enum: 'ManagerType',
								validate: {
									required: true
								}
							}, {
								label: '开关',
								name: 'switch',
								widget: 'switch',
								disabled: false,
								open: '开',
								close: '关'
							}, {
								label: '日期',
								name: 'date',
								widget: 'date',
								type: 'date',
								format: 'yyyy/MM/dd',
								disabledDate: function (d) {
									return d.getTime() > now;
								},
								disabled: false,
								validate: {
									required: true
								}
							}, {
								label: '数字',
								name: 'number',
								widget: 'number',
								max: 10,
								min: -5,
								step: 0.1,
								disabled: false,
								premise(model) {
									return model.switch;
								}
							}, {
								label: '区域',
								name: 'region',
								widget: 'cascader',
								type: 'region',
								disabled: false
							}
							// , {
							// 	label: '图片',
							// 	name: 'image',
							// 	widget: 'image',
							// 	disabled: false
							// }
						],
						format: (model) => {
							return model;
						},
						validate: (model) => {
							return true;
						},
						tools: null
					}
				}
			}
		}
	};
</script>