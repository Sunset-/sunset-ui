<template>
	<div class="sunset-field">
		<time-picker :type="type" v-model="widgetValue" :format="options.format" :options="dateOptions" :disabled="options.disabled" :clearable="options.clearable===false?false:true" :steps="options.steps" :disabled-hours="options.disabledHours" :disabled-minutes="options.disabledMinutes" :disabled-seconds="options.disabledSeconds" :placement="options.placement" :editable="false" :placeholder="options.placeholder"></time-picker>
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
			widgetValue : this.value
		};
    },
    computed: {
        type() {
            return this.options.type || "time";
        },
        dateOptions() {
            var op = {};
            if (this.options.disabledDate) {
                op.disabledDate = this.options.disabledDate;
            }
            return op;
        }
    },
	watch:{
		value(v){
			this.widgetValue = v;
		},
		widgetValue(v){
			this.$emit('input',v);
		}
	}
};
</script>