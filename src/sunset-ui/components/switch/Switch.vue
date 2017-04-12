<template>
    <Switch :checked.sync="value" :disabled="disabled" :size="options.size" @on-change="change">
        <span v-if="options.open" slot="open">{{options.open}}</span>
        <span v-if="options.close" slot="close">{{options.close}}</span>
    </Switch>
</template>
<script>
    export default {
        props: {
            options: {
                type: Object
            },
            value: {
                type: Boolean
            },
            disabled: {

            }
        },
        data() {
            return {
                resetValue: false
            };
        },
        methods: {
            change() {
                this.$emit('change', this.value, this.options, this);
            },
            reset(v) {
                this.value = !!v;
            }
        }
    };
</script>