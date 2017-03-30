<style>
    .checkbox-group-wrap .ivu-checkbox-group {
        padding-top: 6px;
        height: 32px;
    }
</style>
<template>
    <div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
        <label :class="['sunset-field-label',options.label?'':'sunset-field-label-empty']">{{options.label}}</label>
        <div class="sunset-field checkbox-group-wrap">
            <Checkbox-group :model.sync="widgetValue">
                <Checkbox v-for="item in items" :value="item.value" :disabled="item.disabled">
                    <span>{{item.text}}</span>
                </Checkbox>
            </Checkbox-group>
        </div>
    </div>
</template>
<script>
    import Utils from '../Helper.js';

    export default {
        props: {
            options: {
                type: Object
            },
            value: {}
        },
        data() {
            return {
                items: [],
                widgetValue: [],
                lock: false
            };
        },
        computed: {
            spliter() {
                return this.options.spliter || ',';
            }
        },
        methods: {
            init() {
                Utils.generateItems(this.options).then(items => {
                    console.log('ITEMS READY');
                    this.items = items;
                    if (this.options.defaultFirst && (this.value === void 0 || this.value.length == 0)) {
                        this.value = this.items[0].value;
                    }
                    this.refreshWidgetValue(this.value || '');
                    this.$emit('ready', this.options.name);
                });
            },
            refreshWidgetValue(v) {
                if (Sunset.isArray(v)) {
                    this.widgetValue = v;
                } else {
                    this.widgetValue = (v || '').split(this.spliter);
                }
            }
        },
        watch: {
            widgetValue(v) {
                this.$nextTick(() => {
                    this.lock = true;
                    if (Sunset.isArray(v)) {
                        this.value = v.length ? v.join(this.spliter) : '';
                    } else {
                        this.value = v;
                    }
                    this.$nextTick(() => {
                        this.lock = false;
                    });
                });
            },
            value(v) {
                if (!this.lock) {
                    this.refreshWidgetValue(v);
                }
            }
        },
        ready() {
            this.init();
        }
    };
</script>