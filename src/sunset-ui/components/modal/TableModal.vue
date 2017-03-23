<style lang="sass">
    .sunset-table-modal {
        .ivu-modal-body {
            padding-top: 10px;
        }
        .sunset-search-form-container {
            margin-bottom: 10px;
        }
        &.nofoot {
            .ivu-modal-footer {
                display: none;
            }
        }
        .ivu-select-dropdown {
            position: absolute !important;
        }
        .table-modal-selected-wrap {
            padding-bottom: 10px;
            .table-modal-selected-item {
                display: inline-block;
                height: 22px;
                line-height: 22px;
                margin: 2px 4px 2px 0;
                padding: 0 8px;
                border: 1px solid #3399ff;
                border-radius: 3px;
                background: #3399ff;
                font-size: 12px;
                vertical-align: middle;
                opacity: 1;
                overflow: hidden;
                cursor: pointer;
                color: #FFF;
                &.clear {
                    border: 1px solid #ff6600;
                    background: #ff6600;
                }
                .ivu-icon-ios-close-empty {
                    position: relative;
                    top: 1px;
                    margin-left: 3px;
                    -webkit-transform: scale(1.42857143) rotate(0);
                    transform: scale(1.42857143) rotate(0);
                }
            }
        }
    }
</style>
<template>
    <Modal :class-name="'sunset-table-modal '+(!this.multi&&!options.toolbar?'nofoot':'')" :visible.sync="visible" :title="options.title"
        :width="width">
        <!-- 多选标签 -->
        <div v-show="checked.multi&&checkeds.length" class="table-modal-selected-wrap">
            <div class="table-modal-selected-item" v-for="item in checkeds">
                <span>{{item[label]}}</span>
                <Icon type="ios-close-empty" size="14" @click="removeItem(item)"></Icon>
            </div>
            <div v-if="checkeds.length" class="table-modal-selected-item clear" @click="removeAll">
                <span>清空</span>
            </div>
        </div>
        <sunset-filter v-ref:filter v-if="filterOptions" :options="filterOptions" @filter="filterData"></sunset-filter>
        <sunset-table v-ref:table :options="tableOptions" :checkeds.sync="checkeds" :store="options.store"></sunset-table>
        <div slot="footer">
            <sunset-toolbar v-if="toolbar" :options="toolbar"></sunset-toolbar>
        </div>
    </Modal>
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
                visible: false,
                modal_loading: false,
                checkeds: [],
                promise: null
            }
        },
        computed: {
            width() {
                return this.options.width || 700;
            },
            filterOptions() {
                return this.options.filterOptions || this.tableOptions.filter || false;
            },
            tableOptions() {
                return this.options.tableOptions;
            },
            toolbar() {
                return this.options.toolbar || [{
                    label: this.options.cancelText || '取消',
                    color: 'ghost',
                    operate: () => {
                        this.cancel();
                    }
                }, {
                    label: this.options.okText || '确定',
                    color: 'success',
                    loading: this.modal_loading,
                    operate: () => {
                        this.ok();
                    }
                }]
            },
            checked() {
                return this.options.checked || {};
            },
            multi() {
                return this.checked.multi;
            },
            label() {
                return this.checked.label;
            }
        },
        methods: {
            filterData() {
                this.$refs.table.search.apply(this.$refs.table, [].slice.call(arguments));
            },
            removeItem(item) {
                this.$refs.table.checkRecord(item, false);
            },
            removeAll() {
                this.$refs.table.checkAll(false);
            },
            refreshTableOptions() {
                var tableOptions = this.options.tableOptions;
                //多选
                if (this.multi) {
                    tableOptions.multiCheck = true;
                    tableOptions.recordTools = tableOptions.__modalCacheRecordTools || tableOptions.recordTools;
                } else {
                    tableOptions.multiCheck = false;
                    if (!tableOptions.__modalCacheRecordTools && tableOptions.recordTools) {
                        tableOptions.__modalCacheRecordTools = tableOptions.recordTools;
                    }
                    tableOptions.recordTools = {
                        size: 'small',
                        tools: [{
                            label: '选择',
                            color: 'info',
                            operate: (record) => {
                                this.checkeds = [record];
                                this.ok();
                            }
                        }]
                    };
                }
                tableOptions.condensed = true;
                return tableOptions;
            },
            open(checkeds) {
                if (this.$refs.filter) {
                    this.$refs.filter.reset();
                } else {
                    this.$refs.table.search({}, null, true);
                }
                this.refreshTableOptions();
                this.checkeds = checkeds || [];
                this.visible = true;
                return new Promise((resolve, reject) => {
                    this.promise = {
                        resolve,
                        reject
                    };
                });
            },
            ok() {
                Promise.resolve().then(() => {
                    var checkeds = this.checkeds;
                    return Promise.resolve().then(() => {
                        if (this.checked.max && checkeds.length > this.checked.max) {
                            throw new Error(`最多选择${this.checked.max}个`);
                        }
                        if (this.options.validate) {
                            return this.options.validate(checkeds);
                        }
                    }).then(() => {
                        return checkeds;
                    });
                }).then(result => {
                    this.loading(true);
                    this.promise && this.promise.resolve(result);
                    this.$emit('submit', result);
                }).catch(e => {
                    console.error(e);
                    e && e.message && Sunset.tip(e.message, 'warning');
                });
            },
            loading(flag) {
                this.modal_loading = !!flag;
            },
            cancel() {
                this.visible = false;
                this.modal_loading = false;
                this.$emit('cancel');
            }
        }
    };
</script>