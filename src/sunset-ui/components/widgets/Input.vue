<style lang="sass">
	.sunset-input-noicon {
		.ivu-input-wrapper {
			.ivu-input-icon+.ivu-input {
				padding-right: 4px;
			}
		}
	}
</style>
<template>
	<div :class="['sunset-field-wrap',invalid?'field-invalid':'',!options.icon?'sunset-input-noicon':'']">
		<label :class="['sunset-field-label',options.label?'':'sunset-field-label-empty']">{{options.label}}</label>
		<div class="sunset-field">
			<i-input @on-blur="blur" :type="type" :value.sync="inputValue" :maxlength="maxlength" :disabled="options.disabled" :readonly="options.readonly"
			    :placeholder="options.placeholder" :icon="options.icon" :size="options.size" :style="options.style">
				<!-- prepend -->
				<span v-if="prependText" slot="prepend">{{{options.prependText}}}</span>
				<i-select v-if="prependSelect" :model.sync="prependValue" slot="prepend" :style="prependSelect.style">
					<i-option v-for="item in prependItems" :value="item.value">{{ item.text }}</i-option>
				</i-select>
				<!-- append -->
				<span v-if="appendText" style="cursor:pointer;" @click="clickButton" slot="append">{{{appendText}}}</span>
				<i-select v-if="appendSelect" :model.sync="appendValue" slot="append" :style="appendSelect.style">
					<i-option v-for="item in appendItems" :value="item.value">{{ item.text }}</i-option>
				</i-select>
			</i-input>
		</div>
	</div>
</template>
<script>
	import Utils from '../Helper.js';

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
				prependItems: [],
				appendItems: [],
				inputValue: (void 0),
				prependValue: (void 0),
				appendValue: (void 0)
			};
		},
		computed: {
			type() {
				return (this.options.type == 'input' || this.options.type == 'number') ? 'text' : this.options.type;
			},
			isNumber() {
				return this.options.widget == 'number' || this.options.type == 'number';
			},
			digits() {
				return this.options.digits || 0;
			},
			maxlength() {
				return this.options.maxlength || this.options.validate && this.options.validate.maxlength && this.options.validate.maxlength
					.rule;
			},
			prependText() {
				return (this.options.prepend && Sunset.isString(this.options.prepend)) ? this.options.prepend : false;
			},
			prependSelect() {
				return (this.options.prepend && Sunset.isObject(this.options.prepend)) ? this.options.prepend : false;
			},
			prependSpliter() {
				return this.prependSelect && this.prependSelect.spliter || ',';
			},
			appendText() {
				return (this.options.append && Sunset.isString(this.options.append)) ? this.options.append : false;
			},
			appendSelect() {
				return (this.options.append && Sunset.isObject(this.options.append)) ? this.options.append : false;
			},
			appendSpliter() {
				return this.appendSelect && this.appendSelect.spliter || ',';
			}
		},
		methods: {
			clickButton() {
				if (this.options.click) {
					this.options.click(this.options, this.value);
				}
			},
			init() {
				if (this.prependSelect) {
					Utils.generateItems(this.prependSelect).then(items => {
						this.prependItems = items;
						this.prependValue = items.length ? items[0].value : null;
					});
				}
				if (this.appendSelect) {
					Utils.generateItems(this.appendSelect).then(items => {
						this.appendItems = items;
						this.appendValue = items.length ? items[0].value : null;
					});
				}
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
			blur() {
				if (this.isNumber) {
					this.inputValue = Sunset.Numbers.fixed(this.inputValue, this.digits) + '';
				}
			}
		},
		ready() {
			this.init();
		},
		watch: {
			inputValue(v) {
				this.slientRefreshValue();
			},
			prependValue(v) {
				this.slientRefreshValue();
			},
			appendValue(v) {
				this.slientRefreshValue();
			},
			value(v) {
				v = (v === void 0 || v === null) ? '' : (v + '');
				if (!this.lock) {
					//拆出前缀
					if (this.prependSelect && ~v.indexOf(this.prependSpliter)) {
						this.prependValue = v.substring(0, v.indexOf(this.prependSpliter));
						v = v.substring(v.indexOf(this.prependSpliter) + 1, v.length);
					}
					//拆出后缀
					if (this.appendSelect && ~v.indexOf(this.appendSpliter)) {
						this.appendValue = v.substring(v.indexOf(this.appendSpliter) + 1, v.length);
						v = v.substring(0, v.indexOf(this.appendSpliter));
					}
					this.inputValue = v;
				}
			}
		}
	};
</script>