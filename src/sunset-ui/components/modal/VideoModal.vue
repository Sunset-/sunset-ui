
<script>
import Vue from "vue";
import SunsetVideo from "../video/Video.vue";
import "./VideoModal.scss";

var instance = null;

function getInstance() {
    if ($(".sunset-common-videomodal").length && instance) {
        return instance;
    }

    var fragment = $(
        `<div  :class="['sunset-common-videomodal',visible?'show':'']"></div>`
    )[0];
    fragment.innerHTML = `
            <div :class="['sunset-common-videomodal-shim']" @click="cancel"></div>
            <sunset-video v-if="src" ref="player" :style="style" :src="src" :poster="poster" :type="type" :autoplay="autoplay"  @shim-click="cancel"></sunset-video>
    `;
    document.body.appendChild(fragment);

    instance = new Vue({
        el: fragment,
        components: {
            SunsetVideo
        },
        data() {
            return {
                src: "",
                type: "",
                style: {},
                poster: "",
                visible: false,
                autoplay: true
            };
        },
        computed: {},
        methods: {
            show(options) {
                var props = ["src", "type", "style", "poster", "autoplay"];
                Object.keys(options).forEach(key => {
                    if (~props.indexOf(key)) {
                        this[key] = options[key];
                    }
                });
                this.visible = true;
            },
            cancel() {
                this.$refs.player && this.$refs.player.pause();
                this.src = null;
                this.visible = false;
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
}

Sunset.ViewVideo = function(data, options) {
    var instance = getInstance(options);
    instance.show(data);
    return instance;
};
</script>