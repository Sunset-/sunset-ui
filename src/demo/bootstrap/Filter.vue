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
            // this.$refs.filter.reset({
            //     keyword: '123',
            //     type: '2'
            // })
        },
        methods: {
            filter(a, b) {}
        },
        data() {
            return {
                options: {
                    fields: [{
                        label: '',
                        name: 'keyword',
                        placeholder: '关键字',
                        widget: 'input'
                    }, {
                        label: '',
                        name: 'type',
                        placeholder: '枚举',
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
                        name: 'date',
                        placeholder: '日期区间',
                        widget: 'date',
                        type: 'daterange'
                    }],
                    format: (model) => {
                        model.type = '2';
                    },
                    default () {
                        return {
                            keyword: '123',
                            type: '2'
                        };
                    },
                    searchButton: {
                        label: '搜索',
                        icon: 'ios-search',
                        color: 'info'
                    },
                    toolbar: {
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
                        }]
                    }
                }
            }
        }
    }
</script>