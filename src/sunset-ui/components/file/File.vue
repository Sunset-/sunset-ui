<style lang="sass">
	.sunset-file-wrap {
		position: relative !important;
		display: inline-block;
		&>.sunset-file-trigger {}
		&>.sunset-file-pick {
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			bottom: 0px;
			&>div {
				height: 100%;
				width: 100%;
				z-index: 1;
				color: rgba(0, 0, 0, 0);
			}
		}
		//按钮样式
		&:hover {
			.ivu-btn-primary {
				background-color: #5cadff;
				border-color: #5cadff;
			}
			.ivu-btn-info {
				background-color: #57c5f7;
				border-color: #57c5f7;
			}
			.ivu-btn-success {
				background-color: #33d685;
				border-color: #33d685;
			}
			.ivu-btn-warning {
				background-color: #ffad33;
				border-color: #ffad33;
			}
			.ivu-btn-error {
				background-color: #ff5c33;
				border-color: #ff5c33;
			}
		}
		&:active {
			.ivu-btn-primary {
				background-color: #3091f2;
				border-color: #3091f2;
			}
			.ivu-btn-info {
				background-color: #57c5f7;
				border-color: #57c5f7;
			}
			.ivu-btn-success {
				background-color: #00c261;
				border-color: #00c261;
			}
			.ivu-btn-warning {
				background-color: #f29100;
				border-color: #f29100;
			}
			.ivu-btn-error {
				background-color: #f23000;
				border-color: #f23000;
			}
		}
	}
</style>
<template>
	<div class="sunset-file-wrap">
		<div class="sunset-file-trigger">
			<slot>
				<i-button :type="options.color||'primary'" :size="options.size||size" :icon="options.icon">{{options.label||'上传文件'}}</i-button>
			</slot>
		</div>
		<div :id="id" class="sunset-file-pick"></div>
	</div>
</template>
<script>
	import WebUploader from '../../vendor/webuploader/webuploader.min';
	var uid = 0;

	export default {
		props: {
			options: {

			},
			size: {

			},
			queue: {
				default () {
					return [];
				}
			},
			ctx: {}
		},
		attached() {
			this.init();
		},
		data() {
			return {
				id: `sunset-widget-uploader-${++uid}`,
				map: {}
			};
		},
		computed: {
			multi() {
				return !!this.options.multi;
			},
			url() {
				return this.options.url;
			},
			max() {
				return this.options.max || 999;
			}
		},
		methods: {
			init() {
				var uploader = this.uploader = WebUploader.create({
					// swf文件路径
					swf: '../../vendor/webuploader/Uploader.swf',
					// 文件接收服务端。
					server: this.url,
					// 选择文件的按钮。可选。
					// 内部根据当前运行是创建，可能是input元素，也可能是flash.
					pick: `#${this.id}`,
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					fileVal: this.options.filename || 'file',
					resize: false,
					duplicate: true
				});
				//选择文件
				uploader.on('filesQueued', files => {
					if (!files || files[0].size == 0) {
						return;
					}
					var queue = this.queue,
						max = this.max === true ? 9999999 : this.max,
						map = {},
						overflow = false;
					//单图
					if (this.max == 1) {
						uploader.reset();
						this.queue.length = 0;
						var file = files[0];
						queue.push({
							id: file.id,
							name: file.name,
							thumbnail: null,
							file: file,
							progress: 0,
							result: null,
							status: 'READY'
						});
					} else {
						//多图
						files.forEach(file => {
							if (queue.length < max) {
								queue.push({
									id: file.id,
									name: file.name,
									thumbnail: null,
									file: file,
									progress: 0,
									result: null,
									status: 'READY'
								});
							} else {
								uploader.removeFile(file);
								overflow = true;
							}
						});
					}
					queue.forEach(item => {
						if (item.id) {
							map[item.id] = item;
							//缩略图
							if (this.options.thumbnail) {
								item.thumbnail = Sunset.isFunction(this.options.thumbnail) ? this.options.thumbnail(item.value, item.file) :
									this.options
									.thumbnail;
							}
							if (!item.thumbnail) {
								var thumbnailSize = this.options.thumbnailSize || {};
								item.thumbnail || uploader.makeThumb(item.file, (error, src) => {
									if (error) {
										return;
									}
									item.thumbnail = src;
								}, thumbnailSize.width || 100, thumbnailSize.height || 100);
							}
						}
					});
					this.map = map;
					//提示
					if (overflow) {
						Sunset.tip(`最多上传${max}张图片`);
					}
					//上传
					Promise.resolve().then(() => {
						if (this.options.formData) {
							return Sunset.isFunction(this.options.formData) ? this.options.formData(this.ctx) : this.options.formData;
						}
					}).then(formData => {
						uploader.option('formData', formData);
						uploader.upload();
					});
				});
				//上传进度
				uploader.on('uploadProgress', (file, percentage) => {
					var item;
					if (item = this.map[file.id]) {
						item.progress = percentage;
						item.status = 'UPLOADING';
					}
					//计算总进度
					var queue = this.queue;
					var progress = 0;
					queue.forEach(item => {
						progress += item.progress;
					});
					progress = progress / queue.length;
					this.options.progress && this.options.progress(progress);
					this.$emit('progress', progress);
				});
				//上传失败
				uploader.on('uploadError', (file) => {
					var item;
					if (item = this.map[file.id]) {
						item.status = 'ERROR';
					}
				});
				//上传成功
				uploader.on('uploadSuccess', (file, response) => {
					var item;
					if (item = this.map[file.id]) {
						item.status = 'FINISH';
						item.result = response._raw;
					}
					$(`#${this.id} input`).val('');
				});
				//上传完成
				uploader.on('uploadFinished', () => {
					this.options.success && this.options.success(this.queue);
					this.$emit('success', this.queue);
				});
			}
		},
		watch: {
			queue(queue) {
				this.options.queue && this.options.queue(this.queue);
				this.$emit('queue', queue);
			}
		},
		ready() {}
	}
</script>