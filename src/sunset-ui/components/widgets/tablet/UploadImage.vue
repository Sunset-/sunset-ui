<style lang="sass">
	.sunset-upload-item-wrap {
		position: relative;
		border: 1px solid #eee;
		display: inline-block;
		vertical-align: top;
		margin-right: 10px;
		img {
			width: 100%;
			height: 100%;
		}
		.sunset-upload-item-shim {
			position: absolute;
			top: 0px;
			z-index: 1;
			left: 0px;
			right: 0px;
			background: rgba(0, 0, 0, 0.7);
			transition: 0.5s;
		}
		.sunset-upload-item-remove {
			position: absolute;
			top: 2px;
			z-index: 2;
			right: 2px;
			color: #FFF;
			font-size: 18px;
			&:hover {
				color: #d9534f;
			}
		}
	}
</style>

<template>

	<div class="sunset-upload-item-wrap" :style="style">
		<Icon class="sunset-upload-item-remove" type="close-round" @click="remove"></Icon>
		<img class="viewer-image" :group="group" v-if="data.src" :src="data.src" />
		<img class="viewer-image" v-if="!data.src" :src="data.thumbnail" />
		<div v-show="!data.src" class="sunset-upload-item-shim" :style="{height:((100-(data.progress||0)*100)+'%')}"></div>
	</div>

</template>

<script>
	export default {
		props: {
			group: {},
			size: {},
			data: {
				type: Object,
				required: true
			}
		},
		computed: {
			style() {
				return {
					width: `${this.size&&this.size.width||100}px`,
					height: `${this.size&&this.size.height||100}px`
				}
			}
		},
		methods: {
			remove() {
				this.$emit('remove', this.data);
			}
		}
	};
</script>