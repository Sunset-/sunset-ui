<style lang="sass">
    .sunset-file-wrap:hover .test-class {
        background: red;
    }
    
    .sunset-file-wrap:active .test-class {
        background: yellow;
    }
    
    .test-class {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: yellowgreen;
        &:hover {
            background: red;
        }
    }
</style>
<template>
    <h2>Dropdown</h2>
    <div class="component-wrap">
        <sunset-dropdown :options="options.tools[3]"></sunset-dropdown>
    </div>
    <h2>FileUploader</h2>
    <div class="component-wrap">
        <sunset-file :options="options.tools[2]" :ctx="{name : '小明'}" @success="queue" @progress="progress">
            <div class="test-class"></div>
        </sunset-file>
    </div>
    <h2>Toolbar</h2>
    <div class="component-wrap">
        <sunset-toolbar :options="options" :ctx="{name : '小明'}"></sunset-toolbar>
    </div>
    <div>
        <sunset-chart v-ref:chart style="width:400px;height:200px;" :options="echartsOptions" @chart-click="chartClick"></sunset-chart>
    </div>
</template>
<script>
    export default {
        methods: {
            chartClick(params){
            },
            progress(dd) {},
            queue(quene) {}
        },
        ready() {},
        data() {
            return {
                echartsOptions: {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量']
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                },
                options: {
                    size: 'small',
                    tools: [{
                        label: '普通按钮',
                        color: 'primary',
                        operate: () => {
                            // var op = Sunset.clone(this.echartsOptions)
                            this.echartsOptions.series[0].data[0] = 15;
                            this.$refs.chart.refresh();
                            // this.echartsOptions = op;
                        }
                    }, {
                        label: '图标按钮',
                        icon: 'refresh',
                        color: 'success',
                        premise(ctx) {
                            return true;
                        },
                        operate: () => {
                            this.options.tools[2].disabled = false;
                            this.options.tools[0].disabled = false;
                        }
                    }, {
                        label: '文件选择',
                        icon: 'ios-cloud-upload',
                        disabled: true,
                        color: 'success',
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
                        color: 'warning',
                        type: 'dropdown',
                        disabled() {
                            return false;
                        },
                        items: [{
                            label: '图标按钮1',
                            icon: 'refresh',
                            disabled: true,
                            operate() {
                                alert(record.name)
                            }
                        }, {
                            label: '图标按钮2',
                            icon: 'refresh',
                            premise(ctx) {
                                return false;
                            },
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