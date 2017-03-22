<style lang="sass">
</style>
<template>
    <h2>Datapage</h2>
    <div class="component-wrap">
        <sunset-datapage :options="options" @refresh="refresh">
            <div v-for="item in items">
                {{item.name}}
            </div>
        </sunset-datapage>
    </div>
</template>
<script>
    import BootstrapStore from './BootstrapStore.js';

    export default {
        methods: {
            refresh(data) {
                this.items = data;
            }
        },
        data() {
            return {
                items: [],
                options: {
                    pageNumberStart: 0,
                    pageSize: 5,
                    format: {
                        list: 'data',
                        count: 'totalCount',
                        pageSize: 'pageSize',
                        currentPage: 'pageNumber'
                    },
                    datasource: (filter) => {
                        return Promise.resolve({
                            totalCount: 14,
                            data: [{
                                name: '1'
                            }, {
                                name: '2'
                            }, {
                                name: '3'
                            }, {
                                name: '4'
                            }, {
                                name: '5'
                            }, {
                                name: '6'
                            }, {
                                name: '7'
                            }, {
                                name: '8'
                            }, {
                                name: '9'
                            }, {
                                name: '10'
                            }, {
                                name: '11'
                            }, {
                                name: '12'
                            }, {
                                name: '13'
                            }, {
                                name: '14'
                            }, {
                                name: '15'
                            }].slice(filter.pageSize * filter.pageNumber, filter.pageSize * filter.pageNumber +
                                filter.pageSize)
                        });
                    }
                }
            }
        }
    }
</script>