<template>
	<div class="sunset-field">
		<sunset-input :value.sync="inputValue" :options="options"></sunset-input>
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
			return {
				inputValue: ''
			};
		},
		methods: {
			init() {
				this.valueToInputValue(this.value);
			},
			slientRefreshValue() {
				this.$nextTick(() => {
					this.lock = true;
					this.value = this.inputValue && this.inputValue.length ?
						`${this.prependSelect?`${this.prependValue+this.prependSpliter}`:''}${this.inputValue}${this.appendSelect?`${this.appendSpliter+this.appendValue}`:''}` :
						this.inputValue;
					this.$nextTick(() => {
						this.lock = false;
					});
				});
			},
			valueToInputValue(v) {
				v = (v === void 0 || v === null) ? '' : (v + '');
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
		ready() {
			this.init();
		}
	};
</script>