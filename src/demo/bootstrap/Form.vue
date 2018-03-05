<style lang="sass">

</style>
<template>
    <h2>自定义样式FORM</h2>
    <div class="component-wrap">
        <sunset-form :options="styleFormOptions"></sunset-form>
    </div>
    <h2>SearchInput</h2>
    <div class="component-wrap">
        <input v-model="inputValue" /> {{inputValue}}
        <sunset-input :value.sync="inputValue" :options="inputOptions"></sunset-input>
    </div>
    <div class="component-wrap">
        {{searchInputValue}}
        <sunset-search-input :value.sync="searchInputValue" :options="searchInputOptions"></sunset-search-input>
    </div>
    <h2>Form</h2>
    <div class="component-wrap">
        <sunset-form v-ref:form :options="options"></sunset-form>
        <button type="button" @click="reset">重置</button>
        <button type="button" @click="addField">添加字段</button>
        <button type="button" @click="setModel">设置模型</button>
    </div>
    <div class="component-alert" type="error">
    </div>
</template>
<script>
    import BootstrapStore from './BootstrapStore.js';
    import simpleTableOptions from './simpleTableOptions.js';

    import RegionData from '../../sunset-ui/components/data/regionJSON.js';

    function generateCascaderData(list) {
        return (list || RegionData).map(item => {
            var children;
            if (item.sub) {
                children = generateCascaderData(item.sub);
            }
            return {
                label: item.name,
                value: item.name,
                children: children
            };
        })
    }
    var items = [{
        id: 1,
        name: 'aaa'
    }, {
        id: 2,
        name: 'bbb'
    }, {
        id: 3,
        name: 'ccc'
    }];
    export default {
        ready() {},
        methods: {
            filter(a, b) {
                console.log(JSON.stringify(a));
            },
            save(model) {
                alert(model.editor)
            },
            reset() {
                this.$refs.form.reset();
            },
            addField() {
                this.options.fields.push({
                    group: '基本组件',
                    name: 'account111',
                    widget: 'input',
                    type: 'text',
                    placeholder: "不能为空",
                    append: '<span style="color:red;">aaa</span>',
                    click(a, v) {
                        alert(v)
                    },
                    default () {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve('ccccc');
                            }, 200)
                        })
                    },
                    validate: {
                        required: true
                    }
                });
            },
            setModel() {
                this.$refs.form.reset({
                    account: '222',
                    newfield1: '1'
                });
            }
        },
        data() {
            return {
                styleFormOptions: {
                    fields: [{
                        cols: 16,
                        name: 'checkmethod',
                        widget: 'widgetgroup',
                        widgets: [{
                            widget: 'select',
                            name: 'checkmethod',
                            wrapstyle: 'width:50%;padding-right:5px;box-sizing:border-box;',
                            cols: 2,
                            placeholder: '检查方法',
                            data: {
                                '1': 'aaa',
                                '2': 'bbb'
                            }
                        }, {
                            widget: 'input',
                            name: 'checkpoint',
                            wrapstyle: 'width:25%;padding-right:5px;box-sizing:border-box;',
                            cols: 2,
                            placeholder: '部位'
                        }, {
                            widget: 'input',
                            name: 'checktarget',
                            wrapstyle: 'width:25%;padding-right:5px;box-sizing:border-box;',
                            cols: 2,
                            placeholder: '检查目的'
                        }]
                    }, {
                        widget: 'button',
                        size: 'small',
                        cols: 1,
                        text: '添加',
                        color: 'success',
                        operate(model, options, formOptions) {
                            formOptions.fields.splice(formOptions.fields.length - 1, 0, {
                                cols: 16,
                                name: 'checkmethod',
                                widget: 'widgetgroup',
                                widgets: [{
                                    widget: 'select',
                                    name: 'checkmethod',
                                    wrapstyle: 'width:50%;padding-right:5px;box-sizing:border-box;',
                                    cols: 2,
                                    placeholder: '检查方法',
                                    data: {
                                        '1': 'aaa',
                                        '2': 'bbb'
                                    }
                                }, {
                                    widget: 'input',
                                    name: 'checkpoint',
                                    wrapstyle: 'width:25%;padding-right:5px;box-sizing:border-box;',
                                    cols: 2,
                                    placeholder: '部位'
                                }, {
                                    widget: 'input',
                                    name: 'checktarget',
                                    wrapstyle: 'width:25%;padding-right:5px;box-sizing:border-box;',
                                    cols: 2,
                                    placeholder: '检查目的'
                                }]
                            });
                            formOptions.fields.splice(formOptions.fields.length - 1, 0, {
                                widget: 'button',
                                size: 'small',
                                text: '删除',
                                cols: 1,
                                color: 'error',
                                operate(model, options, formOptions) {
                                    formOptions.fields.splice(formOptions.fields.indexOf(options) - 1,
                                        2);
                                }
                            });
                        }
                    }]
                },
                inputValue: '',
                inputOptions: {
                    placeholder: "不能为空",
                    default: 'w,5,day',
                    prepend: {
                        style: 'width:50px',
                        data: [{
                            text: '男',
                            value: 'm'
                        }, {
                            text: '女',
                            value: 'w'
                        }],
                        default: 'w'
                    },
                    defaultAppend: 'month',
                    defaultPrepend: 'w',
                    append: {
                        style: 'width:50px',
                        data: [{
                            text: '岁',
                            value: 'year'
                        }, {
                            text: '月',
                            value: 'month'
                        }, {
                            text: '日',
                            value: 'day'
                        }],
                        default: 'month',
                        // onChange : 'CLEAR'
                    }
                },
                searchInputValue: '1,2,3',
                searchInputOptions: {
                    input: true,
                    multi: true,
                    placeholder: '请输入',
                    formatTemplate(b) {
                        return b
                    },
                    check(v) {
                        if (v.length > 10) {
                            return false;
                        }
                    },
                    search(keyword) {
                        return items.filter(item => ~item.name.indexOf(keyword));
                    },
                    format(item) {
                        return item.name
                    },
                    template(item) {
                        return item.name
                    }
                },
                options: {
                    submit(model) {
                        alert('提交');
                    },
                    cols: 3,
                    rebuild(m, options) {
                        options.fields.push({
                            label: '新增字段',
                            name: 'newfield1',
                            widget: 'input',
                            monopolize: true
                        });
                    },
                    fields: [{
                            group: '基本组件',
                            removeable: true,
                            groupToolbar: {
                                style: {
                                    'margin-left': '30px'
                                },
                                size: 'small',
                                tools: [{
                                    label: '自动识别',
                                    color: 'success',
                                    operate(v) {}
                                }]
                            },
                            label: '用户名',
                            name: 'account',
                            widget: 'input',
                            type: 'text',
                            placeholder: "不能为空",
                            append: '<span style="color:red;">aaa</span>',
                            style: 'width:300px;',
                            click(a, v) {
                                alert(v)
                            },
                            default () {
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve('ccccc');
                                    }, 200)
                                })
                            },
                            validate: {
                                required: true
                            }
                        },
                        /*{
                            text: '新增类型',
                            widget: 'button',
                            // dom: '<div style="width:100px;height:20px;background:red;"></div>',
                            style: 'width:60%;margin-left:10%;',
                            type: 'ghost',
                            operate: (model, ev) => {
                                this.options.fields.unshift({
                                    text: '新增类型2',
                                    widget: 'button',
                                    style: 'width:60%;margin-left:10%;',
                                    type: 'ghost',
                                    operate: eval('(' + 'function(model, ev){alert(model.age)}' + ')')
                                });
                            }
                        },*/
                        {
                            label: 'aaa',
                            fieldClass: 'aaa-333',
                            placeholder: "不能为空",
                            name: 'ssssss',
                            default: 'w,5,day',
                            widget: 'input',
                            prepend: {
                                style: 'width:50px',
                                data: [{
                                    text: '男',
                                    value: 'm'
                                }, {
                                    text: '女',
                                    value: 'w'
                                }],
                                default: 'm'
                            },
                            append: {
                                style: 'width:50px',
                                data: [{
                                    text: '岁',
                                    value: 'year'
                                }, {
                                    text: '月',
                                    value: 'month'
                                }, {
                                    text: '日',
                                    value: 'day'
                                }],
                                default: 'month',
                                onChange: 'CLEAR'
                            }
                        }, {
                            label: '输入框',
                            fieldClass: 'aaa-333',
                            name: 'inputgroup',
                            widget: 'widgetgroup',
                            newline: false,
                            spliter: ';',
                            widgets: [{
                                label: '左眼',
                                placeholder: '左眼视力',
                                name: 'left',
                                widget: 'input',
                                digits: 2,
                                style: 'margin-right:5px;'
                            }, {
                                label: '右眼',
                                placeholder: '右眼视力',
                                name: 'right',
                                widget: 'input',
                                style: 'margin-right:5px;'
                            }]
                        }, {
                            label: '年龄',
                            name: 'age',
                            widget: 'number',
                            // type: 'input',
                            placeholder: "不能为空",
                            default: 'w,5,day',
                            prepend: {
                                style: 'width:50px',
                                data: [{
                                    text: '男',
                                    value: 'm'
                                }, {
                                    text: '女',
                                    value: 'w'
                                }]
                            },
                            append: {
                                style: 'width:50px',
                                data: [{
                                    text: '岁',
                                    value: 'year'
                                }, {
                                    text: '月',
                                    value: 'month'
                                }, {
                                    text: '日',
                                    value: 'day'
                                }]
                            },
                            validate: {
                                required: true
                            }
                        }, {
                            label: '密码',
                            name: 'password',
                            widget: 'input',
                            icon: 'locked',
                            type: 'password'
                        }, {
                            label: '单选',
                            name: 'sex',
                            widget: 'radio',
                            // defaultFirst: true,
                            default: '2',
                            type: 'button',
                            enum: 'SEX',
                            validate: {
                                required: true
                            }
                        }, {
                            label: '多选',
                            name: 'sex1',
                            widget: 'checkbox',
                            default: '2',
                            single: true,
                            watch: ['sex', (deps) => {}],
                            enum: 'SEX'
                        }, {
                            label: '下拉框',
                            name: 'select1',
                            widget: 'select',
                            default: '2',
                            size: 'small',
                            fieldStyle: 'float:right;margin-top:-130px;',
                            defaultFirst: true,
                            enum: 'ACCOUNT_TYPE',
                            onChange(v, m, form) {}
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
                            max: 3,
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
                        },  {
                            label: '时间',
                            name: 'time',
                            widget: 'time',
                            type: 'time',
                            disabledHours : [1,2,3],
                            format: 'HH:mm:ss',
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
                            digits: 2,
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
                            changeOnSelect : true,
                            data: () => {
                                return generateCascaderData();
                            },
                            disabled: false
                        }, {
                            label: '输入查询',
                            name: 'searchinput',
                            widget: 'searchinput',
                            placeholder: "不能为空",
                            default () {
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve('4,6');
                                    }, 200)
                                })
                            },
                            delay: 0,
                            multi: true,
                            check(v) {
                                if (v.length > 10) {
                                    return false;
                                }
                            },
                            popStyle: 'width:150px',
                            all() {
                                return items;
                            },
                            onSelected(v) {},
                            search(keyword) {
                                return items;
                            },
                            format(item) {
                                return item.name
                            },
                            // all: items,
                            validate: {
                                required: true
                            }
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
                        {
                            label: '表格选择',
                            name: 'tableselect',
                            widget: 'tableselect',
                            nameKey: 'nickname',
                            default: '1,2,7',
                            inputable: false,
                            transcode(v) {
                                if (v) {
                                    return BootstrapStore.list().then(res => {
                                        var map = {};
                                        res.rows.forEach(item => {
                                            map[item.id] = item.nickname;
                                        });
                                        var texts = [];
                                        v.forEach(item => {
                                            texts.push(map[item]);
                                        });
                                        return texts;
                                    });
                                }
                            },
                            modalOptions: {
                                title: '选择一个栗子',
                                checked: {
                                    multi: true,
                                    label: 'nickname',
                                },
                                tableOptions: simpleTableOptions
                            }
                        },
                        {
                            label: '树选择',
                            name: 'treeselect',
                            widget: 'treeselect',
                            idKey: 'key',
                            nameKey: 'value',
                            default: '2',
                            transcode: (vs) => {
                                return Promise.resolve(['女'])
                            },
                            modalOptions: {
                                title: '选择一个桃子',
                                style: "height:200px;overflow:auto;",
                                //树
                                treeOptions: {
                                    autoExpand: true,
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
                        },
                        {
                            label: '文件',
                            name: 'file',
                            widget: 'file',
                            dom: '<div style="display:inline-block;width:50px;height:50px;border:1px solid #ccc;">1234</div>',
                            url: '/upload/api/1.0.0/file/storage',
                            default: '5763f45a5d51d4de133b24ccc0f9e3ae',
                            readonly: false,
                            thumbnail: (result, file) => {
                                return result && `/upload/api/1.0.0/file/acquisition/${result}`;
                            },
                            thumbnailRender(src) {
                                return `<div style="border:2px solid blue;width:100%;height:100%"><img class="viewer-image" group="eye" style="height:100%;width:100%;" src="${src}"></div>`
                            },
                            thumbnailSize: {
                                width: 120,
                                height: 60
                            },
                            format: (result) => {},
                            spliter: ';',
                            monopolize: true,
                            disabled: false,
                            toolbar: {
                                size: 'small',
                                tools: [{
                                    label: '转移',
                                    operate: (v) => {
                                        v.file = '1;2;3';
                                    }
                                }]
                            }
                        },
                        {
                            label: '富文本',
                            name: 'editor',
                            widget: 'editor',
                            toolbar: 'bold,italic,superscript,subscript,spechars',
                            readonly: false,
                            monopolize: true,
                            focus: () => {},
                            height:500,
                            editorOptions : {
						        initialFrameHeight:200
                            },
                            validate: {
                                required: true
                            }
                        }
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