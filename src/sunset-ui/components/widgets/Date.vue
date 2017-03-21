<template>
	<div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
		<label :class="['sunset-field-label',options.label?'':'sunset-field-label-empty']">{{options.label}}</label>
		<div class="sunset-field">
			<date-picker :type="type" :value.sync="value" :format="options.format" :options="dateOptions" :disabled="options.disabled"
							:clearable="options.clearable===false?false:true" :placement="options.placement" :editable="false" :placeholder="options.placeholder"></date-picker>
		</div>
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
			return {};
		},
		computed: {
			type() {
				return this.options.type || 'date';
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
		}
	};
</script>