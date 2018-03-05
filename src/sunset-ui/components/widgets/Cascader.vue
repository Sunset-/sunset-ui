<template>
    <div class="sunset-field">
        <Cascader v-ref:cascader :data="data" :value.sync="widgetValue" :size="options.size" :trigger="options.trigger" :change-on-select="options.changeOnSelect"></Cascader>
    </div>
</template>
<script>
    import regionJSON from '../data/regionJSON.js';
    var RegionJSON = null;

    function generateCascaderData(list) {
        return RegionJSON || list.map(item => {
            var children;
            if (item.sub) {
                children = generateCascaderData(item.sub);
            }
            return {
                label: item.name,
                value: item.name,
                children: children
            };
        })
    }

    export default {
        props: {
            options: {
                type: Object
            },
            value: {}
        },
        data() {
            return {
                data: [],
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
                Promise.resolve().then(res => {
                    if (Sunset.isFunction(this.options.data)) {
                        return this.options.data.apply(this.options);
                    } else {
                        return this.options.data;
                    }
                }).then(data => {
                    this.data = data;
                    this.watchedValue(this.value);
                });
            },
            watchedValue(v) {
                if (!this.lock) {
                    var widgetValue = this.widgetValue;
                    while (widgetValue.pop()) {}
                    // this.$refs.cascader.clearSelect();
                    this.$refs.cascader.selected = [];
                    this.$refs.cascader.tmpSelected = [];
                    this.$refs.cascader.$broadcast('on-clear');
                    (Sunset.isArray(v) ? v : (v ? new String(v) : '').split(this.spliter)).forEach(item => {
                        widgetValue.push(item);
                    });
                    // $('input', this.$el).val(widgetValue.join(' / '));
                }
            },
            watchedWidgetValue(v) {
                this.lock = true;
                this.$nextTick(() => {
                    this.value = v && v.join(this.spliter);
                    this.$nextTick(() => {
                        this.lock = false;
                    });
                });
            }
        },
        events: {
            WIDGET_RESET() {
                $('.ivu-input', this.$children[0].$el).val('');
            }
        },
        ready() {
            this.init();
        },
        watch: {
            value(v) {
                this.watchedValue(v);
            },
            widgetValue(v) {
                this.watchedWidgetValue(v);
            }
        }
    };
</script>