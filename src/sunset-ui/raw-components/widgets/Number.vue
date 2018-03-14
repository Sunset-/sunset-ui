<style>
    .sunset-number-input input.ivu-input {
        text-align: right;
        padding-right: 10px;
    }
</style>
<template>
    <div class="sunset-field sunset-number-input">
        <i-input @on-blur="blur" :type="type" :value.sync="value" :maxlength="maxlength" :disabled="options.disabled" :readonly="options.readonly"
            :placeholder="options.placeholder" :icon="options.icon" :size="options.size" :style="options.style">
            <span v-if="options.prepend" slot="prepend">{{options.prepend}}</span>
            <span v-if="options.append" style="cursor:pointer;" @click="clickButton" slot="append">{{options.append}}</span>
        </i-input>
    </div>
</template>
<script>
    export default {
        props: {
            options: {
                type: Object
            },
            value: {
                default: 0
            }
        },
        data() {
            return {};
        },
        computed: {
            maxlength() {
                return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options
                    .validate.maxlength
                    .rule;
            },
            digits() {
                return this.options.digits || 0;
            }
        },
        methods: {
            blur() {
                this.value = Sunset.Numbers.fixed(this.value, this.digits);
            }
        }
    };
</script>