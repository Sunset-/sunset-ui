<style lang="scss">
	.sunset-toolbar {
		display: inline-block;
		vertical-align: top;
		.sunset-toolbar-item {
			display: inline-block;
			vertical-align: top;
			padding-right: 5px;
			font-size: 0px;
			&:last-child {
				padding-right: 0px;
			}
		}
	}
</style>
<template>
	<div class="sunset-toolbar" :style="options.style">
		<template v-for="tool in showTools">
			<div v-permission="tool.permission" class="sunset-toolbar-item" :style="tool.itemStyle">
				<template v-if="!tool.type">
					<i-button :disabled="checkDisabled(tool)" :loading="tool.loading" :size="size" :type="tool.color||tool.type||'primary'" :icon="tool.icon"
					    :shape="options.shape" @click="operate(tool)" :style="tool.style">{{tool.label}}</i-button>
				</template>
				<template v-if="tool.type=='file'">
					<sunset-file :disabled="checkDisabled(tool)" :options="tool" :size="size" :ctx="ctx"></sunset-file>
				</template>
				<template v-if="tool.type=='dropdown'">
					<sunset-dropdown :disabled="checkDisabled(tool)" :size="size" :options="tool" :ctx="ctx"></sunset-dropdown>
				</template>
				<template v-if="tool.type=='switch'">
					<sunset-switch :options="tool" :value="tool.default&&tool.default(ctx)" :disabled="checkDisabled(tool)" @change="switchOperate"></sunset-switch>
				</template>
				<template v-if="tool.type=='download'">
					<a :class="['ivu-btn',size?('ivu-btn-'+size):'',tool.color||tool.type?('ivu-btn-'+tool.color||tool.type):'']" :href="tool.data&&tool.data(ctx)"
					    :download="tool.name&&tool.name(ctx)" :disabled="checkDisabled(tool)" :style="tool.style">
					<i v-if="tool.icon" :class="['ivu-icon',tool.icon?'ivu-icon-'+tool.icon:'']"></i>
					{{tool.label}}
					</a>
				</template>
			</div>
		</template>
	</div>
</template>
<script>
	import Helper from '../Helper.js';

	export default {
		props: {
			options: {},
			ctx: {}
		},
		computed: {
			showTools() {
				var tools = Sunset.isArray(this.options) ? this.options : this.options && this.options.tools;
				return tools && tools.filter(item => {
					if (item.premise && Sunset.isFunction(item.premise)) {
						return item.premise(this.ctx);
					} else {
						return true;
					}
				});
			},
			size() {
				return this.options.size;
			}
		},
		methods: {
			checkDisabled(tool) {
				var disabledValue = false;
				if (tool.disabled === true) {
					disabledValue = true;
				} else if (Sunset.isFunction(tool.disabled)) {
					disabledValue = !!tool.disabled(this.ctx);
				} else {
					disabledValue = false;
				}
				return disabledValue;
			},
			operate(tool) {
				Helper.operate.call(this, tool, this.ctx);
			},
			switchOperate(v, tool, widget) {
				if (this.checkDisabled(tool)) {
					return;
				}
				Promise.resolve(Helper.operate.call(this, tool, this.ctx, v)).catch(e => {
					widget.reset(!v);
				});
			}
		}

	}
</script>