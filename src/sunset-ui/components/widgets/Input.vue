<template>
	<div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
		<label :class="['sunset-field-label',options.label?'':'sunset-field-label-empty']">{{options.label}}</label>
		<div class="sunset-field">
			<i-input :type="type" :value.sync="value" :maxlength="maxlength" :disabled="options.disabled" :readonly="options.readonly"
			    :placeholder="options.placeholder" :icon="options.icon" :size="options.size" :style="options.style">
				<span v-if="options.prepend" slot="prepend">{{options.prepend}}</span>
				<span v-if="options.append" style="cursor:pointer;" @click="clickButton" slot="append">{{options.append}}</span>
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
			type() {
				return this.options.type == 'input' ? 'text' : this.options.type;
			},
			maxlength() {
				return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options.validate.maxlength
					.rule;
			}
		},
		methods: {
			clickButton() {
				if (this.options.click) {
					this.options.click(this.options, this.value);
				}
			}
		}
	};
</script>