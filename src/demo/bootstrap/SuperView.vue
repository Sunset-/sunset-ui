<style lang="sass">
    .superview-container {
        position: relative;
        .test-1 {
            color: red;
        }
    }
</style>

<template>
    <div class="superview-container">
        <sunset-video v-ref:player style="width:300px;" src="rtmp://live.hkstv.hk.lxdns.com/live/hks" poster="//vjs.zencdn.net/v/oceans.png"
            type="rtmp/flv" :autoplay="false"></sunset-video>
        <sunset-video v-ref:player2 style="width:300px;" src="http://vjs.zencdn.net/v/oceans.mp4" poster="//vjs.zencdn.net/v/oceans.png"
            type="video/mp4" :autoplay="true"></sunset-video>
        <sunset-superview v-ref:superview :options="options" style="border:1px solid red;"></sunset-superview>
        <button type="button" @click="viewVideo">查看视频</button>
    </div>
</template>

<script>
    import ViewOne from './ViewOne.vue';
    import ViewTwo from './ViewTwo.vue';

    import Vue from 'vue';
    Vue.component('ViewOne', ViewOne);
    Vue.component('ViewTwo', ViewTwo);

    export default {
        data() {
            return {
                options: {
                    components: [{
                        component: 'ViewOne',
                        style: 'margin-bottom:20px;border-bottom:1px solid orange;display:inline;',
                        options: {}
                    }, {
                        alias: 'aaa',
                        component: 'ViewOne',
                        style: 'position:absolute;right:0px;top:0px;bottom:0px;width:200px;border-left:1px solid #ccc;border-bottom:1px solid orange;display:inline;',
                        options: {}
                    }, {
                        component: 'ViewTwo',
                        options: {},
                        data: '小明',
                        watchs: {
                            'ViewOne:save': {
                                method: 'show1',
                                format(v) {
                                    return `#${v}#`;
                                }
                            }
                        }
                    }, {
                        component: 'ViewTwo',
                        options: {},
                        data: '小红',
                        className: 'test-1',
                        watchs: {
                            'aaa:save': 'show1'
                        }
                    }],
                    watchs: {
                        'aaa:save': function (vv) {}
                    }
                }
            }
        },
        methods: {
            viewVideo() {
                var v = Sunset.ViewVideo({
                    src: 'http://vjs.zencdn.net/v/oceans.mp4', //'http://vjs.zencdn.net/v/oceans.mp4', //'http://mdds.peaimage.com/upload/api/1.0.0/file/acquisition/ee71d95e70934b9637be2af4859bbcf2',
                    type: 'video/mp4',
                    style: 'max-width:30%;max-height:30%;',
                    remainingTimeDisplay: false,
                    autoplay: false
                });

                // setTimeout(() => {
                //     Sunset.ViewVideo({
                //         src: 'http://vjs.zencdn.net/v/oceans.mp4',
                //         type: 'video/mp4',
                //         style : 'width:300px;height:200px;'
                //     });
                // }, 5000)
            }
        },
        ready() {
            var dd = this.$refs.superview.getComponent('aaa');
            dd.setValue('abcd12313');

            // setTimeout(() => {
            //     this.$refs.player.play({
            //         src: 'http://vjs.zencdn.net/v/oceans.mp4',
            //         type: "video/mp4"
            //     });

            // }, 3000);
        }
    }
</script>