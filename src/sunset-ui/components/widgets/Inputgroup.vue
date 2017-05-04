<style lang="sass">
    .sunset-group-input {
        .ivu-input-wrapper {
            .ivu-input-icon+.ivu-input {
                padding-right: 4px;
            }
        }
    }
</style>
<template>
    <div class="sunset-field sunset-group-input">
        <i-input v-for="option in options.items" :type="option.type||'text'" @on-blur="blur(option)" :value.sync="inputValues[`value${$index}`]"
            :maxlength="option.maxlength" :disabled="option.disabled" :readonly="option.readonly" :placeholder="option.placeholder"
            :size="option.size" :style="option.style">
        </i-input>
    </div>
</template>
<script>
    export default {
        props: {
            options: {
                type: Object
            },
            value: {}
        },
        data() {
            return {
                inputValues: {},
                lock: false
            };
        },
        computed: {
            maxlength() {
                return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options
                    .validate.maxlength
                    .rule;
            },
            spliter() {
                return this.options.spliter || ',';
            },
            inputValueStr() {
                return Object.keys(this.inputValues).map(key => this.inputValues[key]).join(this.spliter);
            }
        },
        methods: {
            blur(option) {
                if (option.type == 'number') {
                    this.$set(`inputValues.${option._valuePlace}`, Sunset.Numbers.fixed(this.inputValues[option._valuePlace],
                            option.digits || 0) +
                        '');
                }
            }
        },
        ready() {
            this.options.items.forEach((item, index) => {
                item._valuePlace = `value${index}`;
                this.$set(`inputValues.value${index}`, '123');
            });
        },
        watch: {
            inputValueStr(v) {
                if (!this.lock) {
                    this.value = v;
                }
            },
            value(v) {
                this.lock = true;
                var vs = [];
                if (v && v.length) {
                    vs = v.split(this.spliter);
                }
                this.options.items.forEach((item, index) => {
                    this.$set(`inputValues.value${index}`, vs[index] || '');
                });
                this.$nextTick(() => {
                    this.lock = false;
                });
            }
        }
    };
</script>