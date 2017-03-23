<style lang="sass">
	.sunset-toolbar {
		display: inline-block;
		vertical-align: top;
		.sunset-toolbar-item {
			display: inline-block;
			padding-right: 5px;
			&:last-child {
				padding-right: 0px;
			}
		}
	}
</style>
<template>
	<div class="sunset-toolbar">
		<template v-for="tool in showTools">
			<div v-permission="tool.permission" class="sunset-toolbar-item">
				<template v-if="!tool.type">
					<i-button :loading="tool.loading" :size="size" :type="tool.color||'primary'" :icon="tool.icon" @click="operate(tool)">{{tool.label}}</i-button>
				</template>
				<template v-if="tool.type=='file'">
					<sunset-file :options="tool" :ctx="ctx"></sunset-file>
				</template>
				<template v-if="tool.type=='dropdown'">
					<sunset-dropdown :size="size" :options="tool" :ctx="ctx"></sunset-dropdown>
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
			operate(tool) {
				Helper.operate.call(this, tool, this.ctx);
			}
		}

	}
</script>