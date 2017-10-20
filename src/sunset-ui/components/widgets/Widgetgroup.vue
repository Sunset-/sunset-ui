<style lang="sass">
    .sunset-group-widget {
        &.sunset-field {}
        .group-widget-wrap {
            display: inline-block;
            .sunset-field {
                display: inline-block;
            }
        }
    }
</style>
<template>
    <div class="sunset-field sunset-group-widget">
        <div v-for="widget in widgets" class="group-widget-wrap" :style="widget.wrapstyle">
            {{{widget.label}}}
            <component :is="'widget-'+widget.widget" :options="widget" :value.sync="inputValues[widget.name]"></component>
        </div>
    </div>
</template>
<script>
    import widgets from './table-widgets.js';

    export default {
        components: widgets,
        props: {
            options: {
                type: Object
            },
            value: {}
        },
        data() {
            return {
                inputValues: {},
                lock: false
            };
        },
        computed: {
            widgets() {
                return this.options.widgets || [];
            },
            inputValueStr() {
                return JSON.stringify(this.inputValues);
            }
        },
        methods: {
            init() {
                this.watchedValue(this.value);
            },
            watchedValue(v) {
                this.lock = true;
                try {
                    var json = JSON.parse(v);
                    this.inputValues = json;
                } catch (e) {
                    this.inputValues = {};
                } finally {
                    this.$nextTick(() => {
                        this.lock = false;
                    });
                }
            }
        },
        ready() {
            this.init();
        },
        watch: {
            inputValueStr(v) {
                if (!this.lock) {
                    this.value = v;
                }
            },
            value(v) {
                this.watchedValue(v);
            }
        }
    };
</script>