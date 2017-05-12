<style lang="sass">
    .sunset-datapage-container {
        .sunset-crud-datapage-footer {
            margin-top: 15px;
        }
    }
</style>
<template>
    <div class="sunset-datapage-container">
        <sunset-loading :loading.sync="loading">
            <slot></slot>
        </sunset-loading>
        <!--分页-->
        <div v-show="showPager" class="sunset-crud-datapage-footer">
            <sunset-page @change="refresh" right="true" :page-number.sync="pageNumber" :show-total="true" :page-size="pageSize" :total.sync="count"></sunset-page>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            options: {
                type: Object
            }
        },
        data() {
            return {
                pageNumber: 1,
                filter: {},
                localFilter: null,
                data: null,
                count: 0,
                loading: false
            }
        },
        computed: {
            isLocalPage() {
                return !!this.options.localPage;
            },
            format() {
                return this.options.format || {};
            },
            pageSize() {
                return this.options.pageSize || 10;
            },
            datasource() {
                return this.options.datasource;
            },
            formatFilter() {
                return this.options.formatFilter;
            },
            showPager() {
                return this.count > this.pageSize;
            },
            slientLoading() {
                return this.options.loading === false;
            }
        },
        methods: {
            //设置查询条件
            setFilter(filter, localFilter) {
                this.filter = Sunset.clone(filter || {});
                this.localFilter = localFilter;
                this.refresh(1, true);
            },
            //刷新数据
            refresh(pageNumber, force) {
                pageNumber = pageNumber == void 0 ? this.pageNumber : pageNumber;
                this.pageNumber = pageNumber;
                var filter;
                if (!this.isLocalPage) {
                    filter = Sunset.clone(this.filter);
                    //分页参数
                    filter[this.format['currentPage'] || 'currentPage'] = (this.options.pageNumberStart === 0) ?
                        pageNumber - 1 :
                        pageNumber;
                    filter[this.format['pageSize'] || 'pageSize'] = this.pageSize;
                } else {
                    filter = {};
                }
                //参数格式化
                filter = this.formatFilter && this.formatFilter(filter) || filter;
                Promise.resolve().then(() => {
                    this.$emit('load-start');
                    if (this.isLocalPage && this.data && !force) {
                        return this.data;
                    } else {
                        this.refreshLoader(true);
                        return this.datasource(filter);
                    }
                }).then(res => {
                    this.data = res;
                    this.output();
                    this.$emit('load-end');
                    this.refreshLoader(false);
                }).catch(e => {
                    console.error(e);
                    this.$emit('load-error', e);
                    this.refreshLoader(false);
                });
            },
            refreshLoader(flag) {
                if (!this.slientLoading) {
                    this.loading = flag;
                }
            },
            //输出数据
            output() {
                var list,
                    count = 0;
                //列表数据
                if (this.format && this.format['list'] == '') {
                    list = this.data || [];
                } else {
                    list = this.data && Sunset.getAttribute(this.data, this.format['list'] || 'list', []);
                }
                if (this.isLocalPage) {
                    //本地分页
                    var start = (this.pageNumber - 1) * this.pageSize,
                        localFilter = this.localFilter;
                    list = localFilter && list.filter(localFilter) || list || [];
                    count = list.length;
                    list = list.slice(start, start + this.pageSize);
                } else {
                    count = this.data && Sunset.getAttribute(this.data, this.format['count'] || 'count', 0);
                }
                this.$emit('refresh', list, this.count = count);
            }
        },
        ready() {
            if (!Sunset.isFunction(this.datasource)) {
                throw new Error('datapage need datasource Function !');
            }
            if (!this.options.lazy) {
                this.refresh(1);
            }
        }
    }
</script>