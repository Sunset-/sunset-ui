<style lang="sass">

</style>
<template>
    <h2>Filter</h2>
    <div class="component-wrap">
        <sunset-filter v-ref:filter :options="options" @filter="filter"></sunset-filter>
    </div>
</template>
<script>
    export default {
        ready() {
            // setTimeout(()=>{
            //     console.error('RESET')
            //     this.$refs.filter.reset({
            //         keyword : 'aaa',
            //         sex1 : '1'
            //     })
            // },3000)
        },
        methods: {
            filter(a, b) {
                console.warn(JSON.stringify(a));
            }
        },
        data() {
            return {
                options: {
                    fields: [{
                        name: 'keyword',
                        placeholder: '关键字',
                        widget: 'input'
                    }, {
                        label: '',
                        name: 'sexdefault',
                        placeholder: '性别',
                        widget: 'select',
                        style: {
                            width: '100px'
                        },
                        changeFilter: true,
                        // defaultFirst:true,
                        default: '2',
                        data: {
                            '1': '男',
                            '2': '女'
                        }
                    },{
                        name: 'keyword',
                        placeholder: '关键字',
                        widget: 'input'
                    }, {
                        label: '',
                        name: 'sexdefault',
                        placeholder: '性别',
                        widget: 'select',
                        style: {
                            width: '100px'
                        },
                        changeFilter: true,
                        // defaultFirst:true,
                        default: '2',
                        data: {
                            '1': '男',
                            '2': '女'
                        }
                    }, {
                        name: 'sexfirst',
                        widget: 'checkbox',
                        defaultFirst: true,
                        changeFilter: false,
                        watch: ['sexdefault', (deps, options) => {
                            if (deps.sexdefault == 2) {
                                delete this.enum;
                                this.data = {
                                    '1': '大',
                                    '2': '小'
                                }
                            } else {
                                delete this.data;
                                this.enum = 'SEX'
                            }
                        }],
                        enum: 'SEX'
                    }, {
                        label: '',
                        name: 'job',
                        placeholder: '职业',
                        widget: 'radio',
                        type: 'button',
                        changeFilter: true,
                        default: '2',
                        data: {
                            '1': '男',
                            '2': '女'
                        }
                    }, {
                        label: '',
                        name: 'date',
                        placeholder: '日期区间',
                        widget: 'date',
                        type: 'daterange'
                    }, {
                        label: '',
                        name: 'search',
                        widget: 'search',
                    }],
                    format: (model) => {
                        model.attach = 'abcd';
                    },
                    searchButton: {
                        label: '搜索',
                        icon: 'ios-search',
                        color: 'info'
                    }
                }
            }
        }
    }
</script>