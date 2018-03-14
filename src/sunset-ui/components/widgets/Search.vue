<style lang="scss">
.search-form-group {
    .ivu-input-wrapper {
        margin-top: -2px;
        .ivu-input {
            border-radius: 4px 0px 0px 4px !important;
        }
    }
}
</style>
<template>
	<div class="form-group search-form-group">
		<i-input v-model="widgetValue" @keydown="keydown($event)" :placeholder="options.placeholder" :maxlength="maxlength">
			<i-button @click="search" slot="append" icon="ios-search"></i-button>
		</i-input>
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
        value: {}
    },
    data() {
        return {
            widgetValue: this.value
        };
    },
    computed: {
        type() {
            return this.options.type == "input" ? "text" : this.options.type;
        },
        maxlength() {
            return (
                this.options.maxlength ||
                (this.options.validate &&
                    this.options.validate.maxlength &&
                    this.options.validate.maxlength.rule)
            );
        }
    },
    methods: {
        search() {
            this.$emit("search");
        },
        keydown(ev) {
            if (ev.keyCode == 13) {
                this.search();
            }
        }
    },
    watch: {
        widgetValue(v) {
            this.$emit("input", v);
        },
        value(v) {
            this.widgetValue = v;
        }
    }
};
</script>