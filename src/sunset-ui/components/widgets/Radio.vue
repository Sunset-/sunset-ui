<style lang="scss">
.sunset-field-wrap {
    .radio-group-wrap.radio-pd {
        .ivu-radio-group {
            padding-top: 6px;
        }
    }
    .ivu-radio-group {
        height: 32px;
    }
}
</style>
<template>
    <div :class="['sunset-field radio-group-wrap',options.type=='button'?'':'radio-pd']">
        {{widgetValue}}
        <RadioGroup :type="options.type" :size="options.size" v-model="widgetValue">
            <Radio v-for="item in items" :key="item.value" :label="item.value" :disabled="item.disabled">
                <span>{{item.text}}</span>
            </Radio>
        </RadioGroup>
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
            lock: false,
            widgetLock: false,
            widgetValue: this.value
        };
    },
    computed: {
        type() {
            return this.options.type == "input" ? "text" : this.options.type;
        }
    },
    methods: {
        init() {
            this.$emit("pending");
            Utils.generateItems(this.options).then(items => {
                this.items = items;
                if (
                    this.options.defaultFirst &&
                    (this.value === void 0 || this.value.length == 0) &&
                    this.items.length
                ) {
                    this.widgetValue = this.items[0].value;
                }
                this.$emit("ready", this.options.name, this.widgetValue);
            });
        }
    },
    watch: {
        widgetValue(v) {
            this.$emit('input',v);
        },
        value(v) {
            this.widgetValue = v;
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