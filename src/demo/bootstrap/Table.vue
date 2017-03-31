<style lang="sass">
</style>
<template>
    <h2>Table</h2>
    <div class="component-wrap">
        <sunset-toolbar :options="options.recordTools"></sunset-toolbar>
    </div>
    <h2>Table</h2>
    <div class="component-wrap">
        <sunset-filter :options="filterOptions" @filter="filter"></sunset-filter>
    </div>
    <h2>Table</h2>
    <div class="component-wrap">
        <div v-for="c in checkeds">{{c.nickname}}</div>
        <sunset-table v-ref:table :options="options" :checkeds="checkeds"></sunset-table>
    </div>
</template>
<script>
    import BootstrapStore from './BootstrapStore.js';

    export default {
        methods: {
            filter(filter, localFilter) {
                this.$refs.table.search(filter, localFilter, true);
            }
        },
        data() {
            return {
                checkeds: [],
                filterOptions: {
                    fields: [{
                        widget: 'input',
                        name: 'keyword'
                    }],
                    searchButton: {
                        label: '搜索',
                        color: 'info'
                    }
                },
                options: {
                    store: BootstrapStore,
                    columns: [{
                        title: '昵称',
                        name: 'nickname'
                    }, {
                        title: '登录名',
                        name: 'account',
                        align: 'center',
                        format(v) {
                            return `${parseInt(Math.random()*100)}`;
                        }
                    }, {
                        title: '类型',
                        name: 'type',
                        enum: 'ACCOUNT_TYPE'
                    }],
                    showIndex: true,
                    pageSize: 10,
                    localPage: false,
                    sortable: true,
                    multiCheck: true,
                    format: {
                        list: 'rows',
                        count: 'count',
                        pageSize: 'pageSize',
                        currentPage: 'pageNumber'
                    },
                    recordTools: {
                        tools: [{
                            label: '枚举',
                            icon: 'ios-pricetags',
                            color: 'info',
                            operate: (record) => {
                                this.$broadcast('DICTIONARY_ENUM_SHOW', record);
                            },
                            permission: 'Dictionary_ENUM'
                        }, {
                            label: '修改',
                            icon: 'edit',
                            color: 'warning',
                            signal: 'MODIFY',
                            permission: 'Dictionary_MODIFY'
                        }, {
                            label: '删除',
                            icon: 'trash-a',
                            color: 'error',
                            signal: 'DELETE',
                            permission: 'Dictionary_DELETE'
                        }]
                    }
                }
            }
        }
    }
</script>