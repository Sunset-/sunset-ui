<style lang="sass">
    .sunset-table-modal {
        &.hide-footer {
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
    <Modal :class-name="'sunset-table-modal '+(!multi?'hide-footer':'')" :visible.sync="visible" :title="options.title" @on-ok="ok"
        @on-cancel="cancel" :width="options.width||700">
        <div v-show="checked.multi" class="table-modal-selected-wrap">
            <div class="table-modal-selected-item" v-for="item in checkeds">
                <span>{{item[label]}}</span>
                <Icon type="ios-close-empty" size="14" @click="removeItem($index)"></Icon>
            </div>
            <div v-if="checkeds.length" class="table-modal-selected-item clear" @click="removeAll">
                <span>清空</span>
            </div>
        </div>
        <sunset-table v-ref:table :options="tableOptions" :checkeds.sync="checkeds" :store="options.store"></sunset-table>
        <div slot="footer">
            <div v-if="multi">
                <i-button type="ghost" @click="cancel">{{options.cancelText||'取消'}}</i-button>
                <i-button type="info" :loading="modal_loading" @click="ok">{{options.okText||'确定'}}</i-button>
            </div>
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
            multi() {
                return this.checked.multi;
            },
            tableOptions() {
                return this.options.tableOptions;
            },
            checked() {
                return this.options.checked || {};
            },
            label() {
                return this.checked.label;
            }
        },
        methods: {
            removeItem(index) {
                this.checkeds.splice(index, 1);
            },
            removeAll() {
                this.checkeds = [];
            },
            refreshTableOptions() {
                var tableOptions = this.options.tableOptions;
                //多选
                if (this.multi) {
                    tableOptions.multiCheck = true;
                    this.$refs.table.setRecordTools();
                } else {
                    tableOptions.multiCheck = false;
                    this.$refs.table.setRecordTools([{
                        label: '选择',
                        color: 'info',
                        operate: (record) => {
                            this.checkeds = [record];
                            this.ok();
                        }
                    }]);
                }
                tableOptions.condensed = true;
                return tableOptions;
            },
            open(checkeds, filter, force) {
                this.refreshTableOptions();
                this.checkeds = checkeds || [];
                this.$refs.table.resetFilter(filter);
                force && this.$refs.table.refresh(1, true);
                this.visible = true;
                return new Promise((resolve, reject) => {
                    this.promise = {
                        resolve,
                        reject
                    };
                });
            },
            ok() {
                Promise.resolve().then(res => {
                    var checkeds = this.checkeds;
                    if (this.checked.max && checkeds.length > this.checked.max) {
                        throw new Error(`最多选择${this.checked.max}个`);
                    }
                    if (this.options.validate) {
                        return Promise.resolve().then(() => {
                            return this.options.validate(checkeds);
                        }).then(validateResult => {
                            if (validateResult !== true) {
                                throw new Error(validateResult);
                            } else {
                                return checkeds;
                            }
                        });
                    }
                    return checkeds;
                }).then(result => {
                    this.modal_loading = true;
                    this.promise && this.promise.resolve(result);
                    this.$emit('submit', result);
                }).catch(e => {
                    console.error(e);
                    Sunset.tip(e.message, 'warning');
                    this.modal_loading = false;
                    this.promise && this.promise.reject(e);
                });
            },
            cancel() {
                this.visible = false;
                this.modal_loading = false;
            }
        }
    };
</script>
