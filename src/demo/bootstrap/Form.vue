<style lang="sass">
</style>
<template>
    <h2>Form</h2>
    <div class="component-wrap">
        <sunset-form v-ref:form :options="options"></sunset-form>
    </div>
    <div class="component-alert" type="error">
       1.富文本编辑器样式调试<br />2.表格选择和树选择
    </div>
</template>
<script>
    export default {
        ready() {},
        methods: {
            filter(a, b) {
                console.log(JSON.stringify(a));
            }
        },
        data() {
            return {
                options: {
                    submit(model) {
                        alert('提交');
                    },
                    cols: 3,
                    fields: [{
                            group: '基本组件',
                            label: '用户名',
                            name: 'account',
                            widget: 'input',
                            type: 'input',
                            placeholder: "不能为空",
                            default () {
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve('ccccc');
                                    }, 200)
                                })
                            }
                        }, {
                            label: '密码',
                            name: 'password',
                            widget: 'input',
                            type: 'password'
                        }, {
                            label: '单选',
                            name: 'sex',
                            widget: 'radio',
                            enum: 'SEX'
                        }, {
                            label: '多选',
                            name: 'sex1',
                            widget: 'checkbox',
                            enum: 'SEX'
                        }, {
                            label: '下拉框',
                            name: 'select1',
                            widget: 'select',
                            enum: 'ACCOUNT_TYPE'
                        }, {
                            label: '下拉框2',
                            name: 'select2',
                            widget: 'select',
                            enum: 'SEX',
                            premise(model) {
                                return model.sex == '1';
                            },
                            watch: ['select1', function (dep) {
                                if (dep && dep.select1 == '1') {
                                    this.enum = 'SEX';
                                    this.data = null;
                                    this.validate = {
                                        required: true
                                    }
                                } else {
                                    this.data = {
                                        '1': '成人',
                                        '2': '儿童'
                                    };
                                    this.validate = null
                                }
                            }],
                            data: {
                                a: '男',
                                b: '女'
                            }
                        }, {
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
                            }]
                        }, {
                            label: '日期',
                            name: 'date',
                            widget: 'date',
                            type: 'date',
                            format: 'yyyy/MM/dd',
                            disabled: false
                        }, {
                            label: '开关',
                            name: 'switch',
                            widget: 'switch',
                            disabled: false,
                            default: true,
                            open: '开',
                            close: '关'
                        }, {
                            label: '数字',
                            name: 'number',
                            widget: 'number',
                            max: 10,
                            min: -5,
                            step: 0.1,
                            disabled: false,
                            default: '0.00',
                            premise(model) {
                                return model.switch;
                            }
                        }, {
                            label: '区域',
                            name: 'region',
                            widget: 'cascader',
                            type: 'region',
                            disabled: false
                        }, {
                            label: '文本域',
                            name: 'textarea',
                            widget: 'textarea',
                            monopolize: true,
                            disabled: false
                        }, {
                            group: '高级组件',
                            label: '图标',
                            name: 'icon',
                            widget: 'icon'
                        },
                        // {
                        //     label: '表格选择',
                        //     name: 'tableselect',
                        //     widget: 'tableselect',
                        //     tableOptions: {

                        //     }
                        // },
                        //{
                        //     label: '树选择',
                        //     name: 'treeselect',
                        //     widget: 'treeselect'
                        // },
                        {
                            label: '文件',
                            name: 'file',
                            widget: 'file',
                            url: '/upload/api/1.0.0/file/storage',
                            default: '5763f45a5d51d4de133b24ccc0f9e3ae',
                            thumbnail: (result, file) => {
                                return result && `/upload/api/1.0.0/file/acquisition/${result}`;
                            },
                            thumbnailSize: {
                                width: 120,
                                height: 60
                            },
                            format: (result) => {
                                return 'aa'
                            },
                            spliter: ';',
                            monopolize: true,
                            disabled: false
                        }
                    ],
                    format: (model) => {
                        return model;
                    },
                    validate: (model) => {
                        return new Promise((resolve, reject) => {});
                    },
                    tools: null
                }
            }
        }
    }
</script>