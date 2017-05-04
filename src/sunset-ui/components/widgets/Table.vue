<template>
    <div class="sunset-field">
        <div class="sunset-crud-table-container">
            <div class="table-wrap sunset-crud-table-wrap" :style="{maxHeight:domTableHeight}">
                <table :class="['table table-bordered table-striped',options.condensed?'table-condensed':'']">
                    <thead>
                        <tr>
                            <th v-if="options.multiCheck" class="text-center" style="width:60px;">
                                <input type="checkbox" :checked="isAllCheck" @change="checkAll" />
                            </th>
                            <th v-if="options.showIndex" class="text-center" style="width:60px;">序号</th>
                            <th v-for="col in columns" :style="col.style||{}">
                                <div @click="sort(col)" style="cursor:pointer;">
                                    {{col.title}}
                                    <i v-if="sortable" :class="['fa',sortCol!=col.name?'fa-sort text-stable':(sortOrder=='ASC'?'fa-sort-asc':'fa-sort-desc')]"></i>
                                </div>
                            </th>
                            <th v-if="recordTools&&recordTools.length" class="text-center" :style="{width:(recordToolsWidth+'px')}">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in value" track-by="$index">
                            <td v-for="col in columns" :style="col.style||{}">
                                <div v-if="!col.widget">
                                    {{{getColValue(item,col.name) | sunset_transcode col item}}}
                                </div>
                                <div v-if="col.widget">
                                    <div :is="'widget-'+col.widget" :options="col" :value.sync="item[col.name]"></div>
                                </div>
                            </td>
                            <td class="sunset-table-record-tools" v-if="recordTools&&recordTools.length" class="text-center">
                                <div>
                                    <div>
                                        <sunset-toolbar :options="recordTools" :ctx="item" size="small" @signal="operateRecord"></sunset-toolbar>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="options.table.footTools">
                            <td :colspan="columns.length+(recordTools?1:0)" align="center">
                                <sunset-toolbar :options="options.table.footTools" :ctx="value"></sunset-toolbar>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import widgets from './table-widgets.js';

    export default {
        components: widgets,
        props: {
            options: {
                type: Object
            },
            value: {
                default () {
                    return [];
                }
            },
            invalid: {}
        },
        data() {
            return {};
        },
        computed: {
            tableOptions() {
                return this.options.table || {};
            },
            columns() {
                return this.tableOptions.columns;
            },
            recordTools() {
                return this.tableOptions.recordTools;
            }
        },
        methods: {
            getColValue(item, name) {
                return Sunset.getAttribute(item, name, '');
            },
            operateRecord(signal, item) {
                switch (signal) {
                    case 'REMOVE':
                        this.value.splice(this.value.indexOf(item), 1);
                        break;
                }
            }
        }
    };
</script>