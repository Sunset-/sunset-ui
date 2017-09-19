<template>
    <div>
        <i-button type="info" @click="test">表单Modal</i-button>
        <i-button type="success" @click="test2">表格Modal</i-button>
        <i-button type="warning" @click="test3">树Modal</i-button>
        <sunset-form-modal v-ref:formmodal :options="{title : '表单modal', style : 'max-height:400px',formOptions : options.formOptions}"></sunset-form-modal>
        <sunset-table-modal @submit="tableSelected" v-ref:tablemodal :options="{title : '表格modal',width:1000,validate:tableValidate,checked:checkedOptions,tableOptions : options.tableOptions}"></sunset-table-modal>
        <sunset-tree-modal @submit="treeSelected" v-ref:treemodal :options="options.treeModalOptions"></sunset-tree-modal>
    </div>
</template>
<script>
    import BootstrapStore from './BootstrapStore';

    const now = new Date().getTime();

    export default {
        methods: {
            tableValidate(items) {
                return Promise.resolve().then(res => {
                    if (items.length == 0) {
                        throw new Error('不能为空')
                    }
                });
            },
            test() {
                this.$refs.formmodal.open();
            },
            test2() {
                this.$refs.tablemodal.open();
            },
            test3() {
                this.$refs.treemodal.open('1,2');
            },
            tableSelected(items) {
                this.$refs.tablemodal.loading(false);
            },
            treeSelected(items) {
                debugger;
            },
            save(model) {
                debugger;
            }
        },
        data() {
            return {
                formModalVisible: false,
                checkedOptions: {
                    multi: false,
                    premise: function (r) {
                        debugger;
                        return r.type != '1';
                    }
                },
                options: {
                    title: '管理账户',
                    store: BootstrapStore,
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
                        left: false,
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
                            placeholder: '管理账户类型'
                        }],
                        format: function (filter) {
                            return {
                                keyword: filter.keyword
                            };
                        },
                        searchButton: '查询'
                    },
                    //表格
                    tableOptions: {
                        columns: [{
                            title: '登录名',
                            name: 'account'
                        }, {
                            title: '昵称',
                            name: 'nickname'
                        }, {
                            title: '类型',
                            name: 'type',
                            enum: 'ManagerType'
                        }],
                        showIndex: true,
                        pageSize: 10,
                        localPage: false,
                        multiCheck: false,
                        sortable: true,
                        format: {
                            list: 'rows',
                            count: 'count',
                            pageSize: 'pageSize',
                            currentPage: 'pageNumber'
                        },
                        //表格工具栏
                        toolbar: [],
                        //表格搜索
                        filter: {
                            align: 'right',
                            fields: [{
                                name: 'select',
                                widget: 'select',
                                placeholder: '下拉',
                                data: {
                                    '1': '男',
                                    '2': '女'
                                },
                                changeFilter: true,
                                style: 'width:120px;'
                            }, {
                                name: 'date',
                                widget: 'date',
                                type: 'daterange',
                                placeholder: '时间',
                                style: 'width:200px;'
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
                            icon: 'glyphicon glyphicon-edit',
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
                        store: BootstrapStore
                    },
                    //表格表单
                    formOptions: {
                        cols: 2,
                        store: BootstrapStore,
                        fields: [{
                                label: '登录名',
                                name: 'account',
                                widget: 'input',
                                validate: {
                                    required: true,
                                    maxlength: 32
                                }
                            }, {
                                label: '密码',
                                name: 'password',
                                widget: 'input',
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
                                validate: {
                                    required: true,
                                    maxlength: 32
                                }
                            }, {
                                label: '类型',
                                name: 'type',
                                widget: 'select',
                                enum: 'ACCOUNT_TYPE',
                                dataType: String,
                                validate: {
                                    required: true
                                }
                            },
                            {
                                label: '富文本',
                                name: 'editor',
                                widget: 'editor',
                                toolbar: 'bold,italic,superscript,subscript,spechars',
                                readonly: false,
                                monopolize: true
                            }
                        ],
                        format: (model) => {
                            return model;
                        },
                        validate: (model) => {
                            return true;
                        },
                        tools: false
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
                    },
                    treeModalOptions: {
                        title: '管理账户',
                        store: BootstrapStore,
                        style: "height:200px;overflow:auto;",
                        //树
                        treeOptions: {
                            autoExpand: false,
                            check: 'multi',
                            setting: {
                                data: {
                                    key: {
                                        name: 'value',
                                        title: 'value'
                                    },
                                    simpleData: {
                                        enable: true,
                                        idKey: 'key',
                                        pIdKey: 'parent',
                                        rootPId: null
                                    }
                                },
                                check: {
                                    radioType: 'all'
                                },
                                format: {
                                    nodeToValue(treeNode) {
                                        return treeNode && treeNode.data;
                                    }
                                }
                            }
                        },
                        treeNodes: BootstrapStore.treeNodes()
                    }
                }
            }
        }
    };
</script>