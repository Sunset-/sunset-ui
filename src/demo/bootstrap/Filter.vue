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
            //     this.$refs.filter.reset({
            //         keyword : 'aaa'
            //     })
            // },1000)
        },
        methods: {
            filter(a, b) {
                console.log(JSON.stringify(a));
            }
        },
        data() {
            return {
                options: {
                    fields: [{
                        label: '',
                        name: 'keyword',
                        placeholder: '关键字',
                        widget: 'input',
                        default () {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve('ccccc');
                                }, 500)
                            })
                        }
                    }, {
                        label: '',
                        name: 'sex',
                        placeholder: '性别',
                        widget: 'select',
                        style: {
                            width: '100px'
                        },
                        data: {
                            '1': '男',
                            '2': '女'
                        }
                    }, {
                        label: '',
                        name: 'job',
                        placeholder: '职业',
                        widget: 'radio',
                        type: 'button',
                        changeFilter: true,
                        data: {
                            '1': '男',
                            '2': '女'
                        }
                    }, {
                        name: 'sex1',
                        widget: 'checkbox',
                        defaultFirst: true,
                        watch: ['job', (deps) => {

                        }],
                        enum: 'SEX'
                    }, {
                        label: '',
                        name: 'date',
                        placeholder: '日期区间',
                        widget: 'date',
                        type: 'daterange'
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