<style>
.switch-group-wrap {
    min-height: 32px;
}

.switch-group-wrap .ivu-switch {
    position: relative;
}
</style>
<template>
	<div class="sunset-field switch-group-wrap">
		<Switch v-model="widgetValue" :disabled="options.disabled" :size="options.size">
			<span v-if="options.open" slot="open">{{options.open}}</span>
			<span v-if="options.close" slot="close">{{options.close}}</span>
		</Switch>
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
        value: {
            type: Boolean
        }
    },
    data() {
        return {
            widgetValue: this.value
        };
    },
    watch: {
        value(v) {
            this.widgetValue = v;
        },
        widgetValue(v) {
            this.$emit("input", v);
        }
    }
};
</script>