<template>
    <div class="sunset-field">
        <sunset-search-input v-model="inputValue" :options="options" :size="options.size"></sunset-search-input>
    </div>
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
        value: {},
        invalid: {}
    },
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {
        init() {
            this.valueToInputValue(this.value);
        },
        slientRefreshValue() {
            this.$nextTick(() => {
                this.lock = true;
                var value =
                    this.inputValue && this.inputValue.length
                        ? `${
                              this.prependSelect
                                  ? `${this.prependValue + this.prependSpliter}`
                                  : ""
                          }${this.inputValue}${
                              this.appendSelect
                                  ? `${this.appendSpliter + this.appendValue}`
                                  : ""
                          }`
                        : this.inputValue;

                this.$emit("input", value);
                this.$nextTick(() => {
                    this.lock = false;
                });
            });
        },
        valueToInputValue(v) {
            v = v === void 0 || v === null ? "" : v + "";
            if (!this.lock) {
                this.inputValue = v;
            }
        }
    },
    watch: {
        inputValue(v) {
            this.slientRefreshValue();
        },
        value(v) {
            this.valueToInputValue(v);
        }
    },
    mounted() {
        this.init();
    }
};
</script>