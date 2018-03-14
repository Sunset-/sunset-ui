<template>
    <div class="sunset-field">
        <Select v-model="widgetValue" :placeholder="options.placeholder" :clearable="options.clearable" :multiple="options.multiple" :filterable="options.filterable" :size="options.size">
            <template v-if="groupable">
                <OptionGroup v-for="group in items" :key="group.group" :label="group.group">
                    <Option v-for="item in group.items" :key="item.value" :value="item.value">{{ item.text }}</Option>
                </OptionGroup>
            </template>
            <template v-if="!groupable">
                <Option v-for="item in items" :key="item.value" :value="item.value">{{ item.text }}</Option>
            </template>
        </Select>
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
        value: {},
        invalid: {}
    },
    data() {
        return {
            groupable: false,
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
            this.$nextTick(() => {
                Utils.generateItems(this.options).then(items => {
                    var groups = {},
                        others = [],
                        groupable = false;
                    items &&
                        items.forEach(item => {
                            if (item.group) {
                                groupable = true;
                                (
                                    groups[item.group] ||
                                    (groups[item.group] = [])
                                ).push(item);
                            } else {
                                others.push(item);
                            }
                        });
                    if ((this.groupable = groupable)) {
                        var groupItems = [];
                        for (var g in groups) {
                            if (groups.hasOwnProperty(g)) {
                                groupItems.push({
                                    group: g,
                                    items: groups[g]
                                });
                            }
                        }
                        others.length &&
                            groupItems.push({
                                group: "其他",
                                items: others
                            });
                        this.items = groupItems;
                    } else {
                        this.items = items;
                    }
                    var value;
                    if (
                        this.options.defaultFirst &&
                        (this.value === void 0 || this.value.length == 0) &&
                        this.items.length
                    ) {
                        value = this.items[0].group
                            ? this.items[0].items[0].value
                            : this.items[0].value;
                    }
                    this.refreshWidgetValue(value || "");
                    this.$emit("ready", this.options.name, this.value);
                });
            });
        },
        refreshWidgetValue(v) {
            if (this.options.multiple) {
                if (Sunset.isArray(v)) {
                    this.widgetValue = v;
                } else {
                    this.widgetValue = !!v ? v.split(this.spliter) : [];
                }
            } else {
                this.widgetValue = v;
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
    }
};
</script>