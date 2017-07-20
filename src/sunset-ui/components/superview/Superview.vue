<template>
    <div>
        <sunset-component v-for="cpt in cpts" v-ref:components :component="cpt"></sunset-component>
    </div>
</template>

<script>
    import SunsetComponent from './Component.vue';

    export default {
        components: {
            SunsetComponent
        },
        props: {
            options: {}
        },
        data() {
            return {
                pubsub: {},
                componentMap: {}
            };
        },
        computed: {
            cpts() {
                return this.options.components;
            }
        },
        methods: {
            init() {
                this.initEvents();
            },
            initEvents() {
                var cpts = this.cpts;
                var $components = this.$refs.components;
                var $componentMap = this.componentMap = {};
                var aliases = [];
                //绑定组件
                cpts.forEach((cpt, index) => {
                    var $cpt = $components[index].$children[0];
                    var alias = cpt.alias || cpt.component;
                    $cpt.$$$alias$$$ = alias;
                    cpt.$component = $cpt;
                    $componentMap[alias] = $componentMap[alias] || [];
                    $componentMap[alias].push($cpt);
                });
                //组件事件映射
                var pubsub = this.pubsub = {};
                var $srcs = [];
                cpts.forEach(cpt => {
                    if (Sunset.isObject(cpt.watchs)) {
                        Object.keys(cpt.watchs).forEach(ev => {
                            $srcs = $srcs.concat($componentMap[ev.split(':')[0]]);
                            pubsub[ev] = pubsub[ev] || {
                                $cpts: [],
                                trigger: function (args) {
                                    this.$cpts.forEach($cpt => {
                                        var method = $cpt.method,
                                            $component = $cpt.$component;
                                        $cpt.$component[$cpt.method];
                                        if (Sunset.isObject(method)) {
                                            var format = method.format;
                                            method = method.method;
                                            if (Sunset.isFunction(format)) {
                                                args = format.apply(null, args);
                                                if (!Sunset.isArray(args)) {
                                                    args = [args];
                                                }
                                            }
                                        }
                                        if (Sunset.isString(method)) {
                                            $component[method] && $component[method].apply(
                                                $component,
                                                args);
                                        }
                                    });
                                }
                            };
                            pubsub[ev].$cpts.push({
                                $component: cpt.$component,
                                method: cpt.watchs[ev]
                            });
                        });
                    }
                });
                //绑定事件
                var watchs = this.options.watchs;
                $srcs.forEach(cpt => {
                    var name = cpt.$$$alias$$$;
                    cpt.$on('signal', function (signal) {
                        var eventName = `${name}:${signal}`;
                        try {
                            pubsub[eventName].trigger([].slice.call(arguments, 1));
                        } catch (e) {
                            console.error(e);
                        }
                        try {
                            var func = watchs && watchs[eventName];
                            if (Sunset.isFunction(func)) {
                                func.apply(null, [].slice.call(arguments, 1));
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    });
                });
            },
            getComponent(alias) {
                var cs = this.componentMap[alias];
                return cs.length == 1 ? cs[0] : cs;
            }
        },
        ready() {
            this.init();
        }
    }
</script>