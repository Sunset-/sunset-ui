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

	<div :style="imageStyle" class="sunset-upload-item-wrap" :style="size">
		<Icon class="sunset-upload-item-remove" type="close-round" @click="remove"></Icon>
		<img class="viewer-image" v-if="data.src" :src="data.src | upload-image" />
		<img class="viewer-image" v-if="!data.src" :src="data.thumbnail" />
		<div class="sunset-upload-item-shim" :style="{height:((100-(data.progress||0)*100)+'%')}"></div>
	</div>

</template>

<script>
	export default {
		props: {
			imageStyle: {

			},
			size: {
				coerce(value) {
					if (!value) {
						value = '100';
					}
					var spliter = value.split(','),
						w, h;
					if (spliter.length >= 2) {
						w = spliter[0];
						h = spliter[1];
					} else {
						w = h = value;
					}
					return {
						width: w + 'px',
						height: h + 'px'
					};
				}
			},
			data: {
				type: Object,
				required: true
			}
		},
		methods: {
			remove() {
				this.$dispatch('SUNSET_IMAGE_REMOVE', this.data);
			}
		}
	};
</script>