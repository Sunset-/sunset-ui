<template>
	<div class="sunset-field">
		<i-input type="textarea" :value.sync="value" :maxlength="maxlength" :disabled="options.disabled" :readonly="options.readonly"
		    :placeholder="options.placeholder" :icon="options.icon" :size="options.size" :rows="options.rows||3" :autosize=options.autosize
		    :style="options.style">
			<span v-if="options.prepend" slot="prepend">{{options.prepend}}</span>
			<span v-if="options.append" slot="append">{{options.append}}</span>
		</i-input>
		<div v-if="maxlength&&options.lengthTip" style="padding:2px;font-size:14px;color:#ababab;text-align:right;">
			{{inputlength}}&nbsp;/&nbsp;{{maxlength}}
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
			inputlength() {
				return this.value && this.value.length || 0;
			},
			maxlength() {
				return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options.validate.maxlength
					.rule;
			}
		}
	};
</script>