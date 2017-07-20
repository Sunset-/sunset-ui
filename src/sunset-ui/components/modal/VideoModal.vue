<style lang="sass">
    .sunset-common-videomodal {
        display: none;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 9999;
        &>.sunset-common-videomodal-shim {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            z-index: 0;
            background: rgba(0, 0, 0, 0.75);
        }
        .sunset-video-wrap {
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            z-index: 1;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            &>div {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        &.show {
            display: block;
        }
    }
</style>

<script>
    import Vue from 'vue';
    import SunsetVideo from '../video/Video.vue';

    var instance = null;

    function getInstance() {
        if ($('.sunset-common-videomodal').length && instance) {
            return instance;
        }
        const div = document.createElement('div');
        div.innerHTML =
            `
            <div class="sunset-common-videomodal-shim" @click="cancel"></div>
            <sunset-video v-if="src" v-ref:player :style="style" :src="src" :poster="poster" :type="type" :autoplay="autoplay"  @shim-click="cancel"></sunset-video>
    `;
        div.className = 'sunset-common-videomodal';
        document.body.appendChild(div);

        instance = new Vue({
            el: div,
            components: {
                SunsetVideo
            },
            data() {
                return {
                    src: '',
                    type: '',
                    style: {},
                    poster: '',
                    autoplay: true
                };
            },
            computed: {},
            methods: {
                show(options) {
                    var props = ['src', 'type', 'style', 'poster', 'autoplay'];
                    Object.keys(options).forEach(key => {
                        if (~props.indexOf(key)) {
                            this[key] = options[key];
                        }
                    });
                    div.className = 'sunset-common-videomodal show';
                },
                cancel() {
                    this.$refs.player && this.$refs.player.pause();
                    this.src = null;
                    div.className = 'sunset-common-videomodal';
                }
            }
        });
        var videoInstance = instance.$children[0];

        return {
            show(data, options) {
                instance.show(data, options);
            },
            cancel() {
                instance.cancel();
            },
            component: instance
        };
    };

    Sunset.ViewVideo = function (data, options) {
        var instance = getInstance(options);
        instance.show(data);
        return instance;
    };
</script>