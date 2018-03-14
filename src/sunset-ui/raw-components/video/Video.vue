<style lang="scss">
    .sunset-video-wrap {
        &>div {
            max-width: 90%;
            max-height: 90%;
        }
        .vjs-fullscreen {
            video {
                width: 100% !important;
                height: 100% !important;
            }
        }
    }
</style>

<template>
    <div class="sunset-video-wrap" :style="style" @click="wrapClick($event)">
        <video controls preload="auto" :id="id" class="video-js" controls preload="auto" :autoplay="autoplay" :poster="poster" data-setup='{}'>
            <source :src="src" :type="type"></source>
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>
    </div>
</template>
<script>
    var uniq_id = 0;

    export default {
        props: {
            style: {
                default: {
                    'max-width': '100%',
                    'max-height': '100%'
                }
            },
            poster: {

            },
            src: {

            },
            type: {
                default: 'video/mp4'
            },
            autoplay: {

            },
            options: {

            }
        },
        data() {
            return {
                id: `sunset-video-${++uniq_id}`,
                player: null
            }
        },
        methods: {
            init() {
                if (!window.videojs) {
                    throw new Error('未引入video.js');
                }
                var options = this.options || {};
                var self = this;
                var player = videojs(this.id, options, function onPlayermounted(){
                    self.player = this;
                    if (self.src && this.autoplay) {
                        this.play();
                    }
                    self.$emit('ready');
                    this.on('ended', function () {
                        self.$emit('end');
                    });
                });
            },
            play(src) {
                if (this.player) {
                    this.player.src(src);
                    this.player.play();
                }
            },
            pause() {
                if (this.player) {
                    this.player.pause();
                }
            },
            getPlayer() {
                return this.player;
            },
            wrapClick(ev) {
                if ($(ev.target).closest('.video-js').length == 0) {
                    this.$emit('shim-click');
                }
            }
        },
        mounted(){
            this.init();
        }
    }
</script>