<style lang="sass">

</style>
<template>
    <h2>Form</h2>
    <div class="component-wrap">
        <sunset-form v-ref:form :options="options"></sunset-form>
    </div>
    <Alert type="error">
        1.表单组件初始值未完成<br/> 2.表单组件rebuild重新设计<br>3.富文本编辑器样式调试<br>4.图片上传组件重新设计
    </Alert>
</template>
<script>
    export default {
        ready() {

        },
        methods: {
            filter(a, b) {
                console.log(JSON.stringify(a));
            }
        },
        data() {
            return {
                options: {
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
                                    }, 3000)
                                })
                            },
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
                            enum: 'SEX',
                            validate: {
                                required: true
                            }
                        }, {
                            label: '多选',
                            name: 'sex1',
                            widget: 'checkbox',
                            enum: 'SEX',
                            validate: {
                                required: true
                            }
                        }, {
                            label: '下拉框',
                            name: 'select1',
                            widget: 'select',
                            enum: 'ACCOUNT_TYPE',
                            validate: {
                                required: true
                            }
                        }, {
                            label: '下拉框2',
                            name: 'select2',
                            widget: 'select',
                            enum: 'SEX',
                            watch: 'select1',
                            rebuild(dep) {
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
                            },
                            data: {
                                a: '男',
                                b: '女'
                            },
                            validate: {
                                required: true
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
                            }],
                            validate: {
                                required: true
                            }
                        }, {
                            label: '日期',
                            name: 'date',
                            widget: 'date',
                            type: 'date',
                            format: 'yyyy/MM/dd',
                            disabled: false,
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
</script>