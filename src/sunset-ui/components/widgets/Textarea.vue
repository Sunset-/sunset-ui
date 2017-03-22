<template>
	<div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
		<label class="sunset-field-label">{{options.label}}</label>
		<div class="sunset-field">
			<i-input type="textarea" :value.sync="value" :maxlength="maxlength" :disabled="options.disabled" :readonly="options.readonly"
							:placeholder="options.placeholder" :icon="options.icon" :size="options.size" :rows="options.rows||3" :autosize=options.autosize :style="options.style">
			</i-input>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object
			},
			value: {},
			invalid: {}
		},
		data() {
			return {};
		},
		computed: {
			maxlength() {
				return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options.validate.maxlength
					.rule;
			}
		}
	};
</script>