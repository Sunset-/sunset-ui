<template>
    <div>
        <div style="border:1px solid #09c;padding:5px;margin:5px;">
            <h3>编辑</h3>
            <sunset-form ref="configform" :options="options"></sunset-form>
            <div style="background:#FFF;">
                <sunset-table ref="configtable" :options="filedsOptions"></sunset-table>
                <sunset-toolbar :options="toolbarOptions"></sunset-toolbar>
            </div>
        </div>
        <div style="border:1px solid yellowgreen;padding:5px;margin:5px;">
            <h3>渲染</h3>
            <sunset-form v-if="renderFormOptions" ref="renderform" :options="renderFormOptions"></sunset-form>
            {{renderFormResult}}
        </div>
        <sunset-form-modal ref="fieldmodal" :options="fieldmodalOptions"></sunset-form-modal>
    </div>
</template>
<script>
    export default {
        mounted(){
            this.init();
        },
        methods: {
            init() {
                this.form = localStorage.getItem('SERIALIZE_FORM') && JSON.parse(localStorage.getItem('SERIALIZE_FORM')) ||
                    {};
                this.$nextTick(() => {
                    this.$refs.configform.reset(this.form);
                    this.fields = this.form.fields || [];
                    this.$refs.configtable.refresh(1, true);
                });
            },
            saveForm(form) {
                Object.assign(this.form, form);
                this.storage();
            },
            saveField(field) {
                var fields = this.form.fields || [];
                var originFieldIndex = fields.findIndex(item => item.name == field.name);
                if (originFieldIndex >= 0) {
                    fields.splice(originFieldIndex, 1, field);
                } else {
                    fields.push(field);
                }
                this.form.fields = fields;
                this.storage();
            },
            removeField(field) {
                var fields = this.form.fields || [];
                this.form.fields = fields.filter(item => item != field);
                this.storage();
            },
            storage() {
                localStorage.setItem('SERIALIZE_FORM', JSON.stringify(this.form));
                this.init();
            },
            renderForm() {
                this.renderFormOptions = null;
                this.$nextTick(() => {
                    var config = localStorage.getItem('SERIALIZE_FORM') && JSON.parse(
                        localStorage.getItem('SERIALIZE_FORM'));
                    if (config) {
                        if (config.cast) {
                            config.cast = eval('(' + config.cast + ')').bind(this);
                        }
                        if (config.format) {
                            config.format = eval('(' + config.format + ')').bind(this);
                        }
                        if (config.submit) {
                            config.submit = eval('(' + config.submit + ')').bind(this);
                        }
                        if (config.validate) {
                            config.validate = eval('(' + config.validate + ')').bind(this);
                        }
                        var fields = config.fields;
                        config.fields = fields.map(field => {
                            var other = field.other && eval('(' + field.other + ')') || {},
                                validate = field.validate && eval('(' + field.validate + ')');
                            delete field.other;
                            delete field.validate;
                            var field = Object.assign(other, field);
                            if (validate) {
                                field.validate = validate;
                            }
                            return field;
                        });
                        debugger;
                        this.renderFormOptions = config;
                    }
                });
            }
        },
        data() {
            return {
                form: {},
                fields: [],
                renderFormOptions: null,
                renderFormResult: null,
                options: {
                    cols: 3,
                    store: {},
                    fields: [{
                        group: '基本信息',
                        label: '多列布局',
                        name: 'cols',
                        widget: 'number',
                        validate: {
                            required: true,
                            maxlength: 1
                        }
                    }, {
                        label: '正向格式化',
                        name: 'cast',
                        widget: 'coder',
                        monopolize: true
                    }, {
                        label: '反向格式化',
                        name: 'format',
                        widget: 'coder',
                        monopolize: true
                    }, {
                        label: '全局校验',
                        name: 'validate',
                        widget: 'coder',
                        monopolize: true
                    }, {
                        label: '提交',
                        name: 'submit',
                        widget: 'coder',
                        newline: true,
                        monopolize: true
                    }],
                    format: (model) => {
                        return model;
                    },
                    validate: (model) => {
                        return true;
                    },
                    submit: (model) => {
                        this.saveForm(model);
                    },
                    tools: null
                },
                filedsOptions: {
                    columns: [{
                        title: '名称',
                        name: 'label'
                    }, {
                        title: '标识',
                        name: 'name'
                    }, {
                        title: '类型',
                        name: 'widget'
                    }, {
                        title: '换行',
                        name: 'newline',
                        format(v) {
                            return v == 'true' ? '是' : '否';
                        }
                    }, {
                        title: '独占一行',
                        name: 'monopolize',
                        format(v) {
                            return v == 'true' ? '是' : '否';
                        }
                    }],
                    showIndex: true,
                    pageSize: 10,
                    localPage: false,
                    sortable: false,
                    multiCheck: false,
                    format: {
                        list: '',
                        count: 'length',
                        pageSize: 'pageSize',
                        currentPage: 'pageNumber'
                    },
                    recordTools: {
                        tools: [{
                            label: '修改',
                            icon: 'edit',
                            color: 'warning',
                            operate: (record) => {
                                this.$refs.fieldmodal.open(record);
                            },
                            permission: 'Dictionary_ENUM'
                        }, {
                            label: '删除',
                            icon: 'remove',
                            color: 'danger',
                            operate: (record) => {
                                this.removeField(record);
                            },
                            permission: 'Dictionary_ENUM'
                        }]
                    },
                    datasource: (data) => {
                        return this.fields;
                    }
                },
                toolbarOptions: {
                    tools: [{
                        label: '新增表单项',
                        color: 'success',
                        operate: () => {
                            this.$refs.fieldmodal.open({});
                        }
                    }, {
                        label: '渲染表单',
                        color: 'info',
                        operate: () => {
                            this.renderForm();
                        }
                    }]
                },
                fieldmodalOptions: {
                    title: '编辑表单项',
                    width: 800,
                    formOptions: {
                        cols: 2,
                        store: {},
                        fields: [{
                            group: '基本信息',
                            label: '组名',
                            name: 'group',
                            widget: 'input'
                        }, {
                            label: '标题',
                            name: 'label',
                            widget: 'input'
                        }, {
                            label: '属性名',
                            name: 'name',
                            widget: 'input'
                        }, {
                            label: '默认值',
                            name: 'default',
                            widget: 'input'
                        }, {
                            label: '换行',
                            name: 'newline',
                            widget: 'switch'
                        }, {
                            label: '通行',
                            name: 'monopolize',
                            widget: 'switch'
                        }, {
                            group: '组件配置',
                            label: '组件类型',
                            name: 'widget',
                            widget: 'select',
                            data: [{
                                text: '文本输入框',
                                value: 'input'
                            }, {
                                text: '搜索输入框',
                                value: 'searchinput'
                            }, {
                                text: '文本输入框组',
                                value: 'inputgroup'
                            }, {
                                text: '单选按钮',
                                value: 'radio'
                            }, {
                                text: '复选按钮',
                                value: 'checkbox'
                            }, {
                                text: '下拉框',
                                value: 'select'
                            }, {
                                text: '开关',
                                value: 'switch'
                            }, {
                                text: '日期',
                                value: 'date'
                            }, {
                                text: '级联框',
                                value: 'cascader'
                            }, {
                                text: '文本域',
                                value: 'textarea'
                            }, {
                                text: '文件上传',
                                value: 'file'
                            }, {
                                text: '富文本编辑',
                                value: 'editor'
                            }, {
                                text: '表格选择',
                                value: 'tableselect'
                            }, {
                                text: '树选择',
                                value: 'treeselect'
                            }, {
                                text: '按钮',
                                value: 'button'
                            }],
                            validate: {
                                required: true
                            }
                        }, {
                            label: '其他配置',
                            name: 'other',
                            widget: 'coder',
                            monopolize: true
                        }, {
                            group: '校验配置',
                            label: '校验配置',
                            name: 'validate',
                            widget: 'coder',
                            monopolize: true
                        }],
                        format: (model) => {
                            return model;
                        },
                        validate: (model) => {
                            return true;
                        },
                        submit: (model) => {
                            this.saveField(model);
                        },
                        tools: false
                    }
                }
            }
        }
    }
</script>