<template>
	<div class="sunset-field">
		<DatePicker  :type="type" v-model="widgetValue" :format="options.format" :options="dateOptions" :disabled="options.disabled" :clearable="options.clearable===false?false:true" :placement="options.placement" :editable="false" :placeholder="options.placeholder"></DatePicker >
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
            return this.options.type || "date";
        },
        dateOptions() {
            var op = {};
            if (this.options.disabledDate) {
                op.disabledDate = this.options.disabledDate;
            }
            if (this.options.shortcuts) {
                op.shortcuts = this.options.shortcuts;
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