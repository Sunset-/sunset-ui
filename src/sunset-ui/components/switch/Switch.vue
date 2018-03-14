<template>
    <Switch v-model="widgetValue" :disabled="disabled" :size="options.size">
        <span v-if="options.open" slot="open">{{options.open}}</span>
        <span v-if="options.close" slot="close">{{options.close}}</span>
    </Switch>
</template>
<script>
export default {
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        options: {
            type: Object
        },
        value: {
            type: Boolean
        },
        disabled: {}
    },
    data() {
        return {
            widgetValue: this.value
        };
    },
    methods: {
        reset(v) {
            this.widgetValue = !!v;
        }
    },
    watch: {
        widgetValue(v) {
            this.$emit("input", v, this.options, this);
            this.$emit("change", v, this.options, this);
        },
        value(v) {
            this.widgetValue = v;
        }
    }
};
</script>