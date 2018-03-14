<style>
.checkbox-group-wrap .ivu-checkbox-group {
    padding-top: 6px;
    height: 32px;
}
</style>
<template>
    <div class="sunset-field checkbox-group-wrap">
        <Checkbox-group v-model="widgetValue">
            <Checkbox v-for="item in items" :key="item.value" :label="item.value" :disabled="item.disabled" @mousedown.stop="handleClick(item.value)">
                <span v-html="item.text"></span>
            </Checkbox>
        </Checkbox-group>
    </div>
</template>
<script>
import Utils from "../Helper.js";

export default {
    model: {
        prop: "value",
        event: "input"
    },
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
            return this.options.spliter || ",";
        }
    },
    methods: {
        init() {
            Utils.generateItems(this.options).then(items => {
                this.items = items;
                if (
                    this.options.defaultFirst &&
                    (this.value === void 0 || this.value.length == 0) &&
                    this.items.length
                ) {
                    this.widgetValue = this.items[0].value;
                }
                this.refreshWidgetValue(this.widgetValue || "");
                this.$emit("ready", this.options.name, this.widgetValue);
            });
        },
        refreshWidgetValue(v) {
            if (Sunset.isArray(v)) {
                this.widgetValue = v;
            } else {
                this.widgetValue = !!v ? v.split(this.spliter) : [];
            }
        },
        handleClick(v) {
            if (this.options.single) {
                if (!~this.widgetValue.indexOf(v)) {
                    while (this.widgetValue.pop()) {}
                }
            }
        }
    },
    watch: {
        widgetValue(v) {
            this.$nextTick(() => {
                this.lock = true;
                var value;
                if (Sunset.isArray(v)) {
                    if (this.options.max) {
                        if (v.length > this.options.max) {
                            Sunset.tip(`最多选择${this.options.max}个`);
                            v.pop();
                        }
                    }
                    value = v.length ? v.join(this.spliter) : "";
                } else {
                    value = v;
                }
                this.$emit("input", value);
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
    mounted() {
        this.init();
        this.$watch("options.data", function() {
            this.init();
        });
        this.$watch("options.enum", function() {
            this.init();
        });
    }
};
</script>