<style lang="sass">
</style>
<template>
    <h2>Dropdown</h2>
    <div class="component-wrap">
        <sunset-dropdown :options="options.tools[3]"></sunset-dropdown>
    </div>
    <h2>FileUploader</h2>
    <div class="component-wrap">
        <sunset-file :options="options.tools[2]" :ctx="{name : '小明'}" @success="queue" @progress="progress"></sunset-file>
    </div>
    <h2>Toolbar</h2>
    <div class="component-wrap">
        <sunset-toolbar :options="options" :ctx="{name : '小明'}"></sunset-toolbar>
    </div>
    <div class="component-alert" type="error">
        1.文件上传：上传自定义Picker样式未解决
    </div>
</template>
<script>
    export default {
        methods: {
            progress(dd) {},
            queue(quene) {}
        },
        data() {
            return {
                options: {
                    size: 'small',
                    tools: [{
                        label: '普通按钮',
                        color: 'primary',
                        operate() {
                            alert(123)
                        }
                    }, {
                        label: '图标按钮',
                        icon: 'refresh',
                        color: 'success',
                        premise(ctx) {
                            return true;
                        },
                        operate() {
                            alert(123)
                        }
                    }, {
                        label: '文件选择',
                        icon: 'ios-cloud-upload',
                        color: 'warning',
                        type: 'file',
                        url: '/service/system/file/upload',
                        className: 'my-uploader-trigger',
                        formData(record) {
                            return {
                                sunset: record.name
                            }
                        },
                        progress(v) {
                            console.log(v)
                        }
                    }, {
                        label: '图标按钮',
                        color: 'success',
                        type: 'dropdown',
                        items: [{
                            label: '图标按钮1',
                            icon: 'refresh',
                            operate() {
                                alert(record.name)
                            }
                        }, {
                            label: '图标按钮2',
                            icon: 'refresh',
                            operate() {
                                alert(record.name)
                            }
                        }, {
                            label: '图标按钮3',
                            icon: 'refresh',
                            operate(record) {
                                alert(record.name)
                            }
                        }]
                    }]
                }
            }
        }
    }
</script>