<style lang="scss">
.sunset-filter-field {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    font-size: 0px;
    &:last-child {
        margin-right: 0px;
    }
    .sunset-field-wrap {
        width: 100%;
        display: inline-table;
        font-size: 12px;
        .sunset-field-label {
            display: table-cell;
            padding: 0px 10px;
            white-space: nowrap;
            text-align: right;
            vertical-align: middle;
            &.sunset-field-label-empty {
                padding: 0px;
            }
        }
        .sunset-field {
            display: table-cell;
        }
    }
    .control-label {
        display: table-cell;
        padding: 0px 10px;
        white-space: nowrap;
        vertical-align: middle;
    }
    .input-group {
        display: table-cell;
        width: 100%;
    }
}
</style>
<template>
	<div v-show="!options.hide" :style="options.style" class="sunset-filter-field">
		<span style="font-size:12px;">{{fieldValue}}</span>
		<div class="sunset-field-wrap">
			<label v-if="options.label" class="sunset-field-label">{{options.label}}</label>
			<component :is="widget" :options="options" v-model="fieldValue" @search="fieldSearch" @pending="widgetPending" @ready="widgetReady"></component>
		</div>
	</div>
</template>
<script>
import widgets from "../widgets/filter-widgets.js";

export default {
    components: widgets,
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        options: {
            type: Object
        },
        value: {},
        filter: {}
    },
    data() {
        return {
            pending: false,
            fieldValue: this.value
        };
    },
    computed: {
        widget() {
            return "widget-" + this.options.widget;
        }
    },
    methods: {
        widgetPending() {
            this.pending = true;
        },
        fieldSearch() {
            this.$emit("search");
        },
        widgetReady(name, defaultValue) {
            this.pending = false;
            this.$emit("ready", name, defaultValue);
        },
        generateWatchDependent(watchs) {
            var dep = {},
                filter = this.filter;
            watchs.split(",").forEach(w => {
                dep[w] = filter[w];
            });
            return dep;
        },
        rebuild(watchs, rebuild) {
            Promise.resolve()
                .then(() => {
                    return rebuild.call(
                        this.options,
                        this.generateWatchDependent(watchs),
                        this.options,
                        this.filter
                    );
                })
                .then(res => {
                    if (res !== false) {
                        this.$children[0].init && this.$children[0].init();
                    }
                });
        }
    },
    mounted() {
        this.$watch("value", (v, oldv) => {
            if (v === void 0) {
                this.fieldValue = "";
                return;
            }
            if (oldv === void 0 && v === "") {
                return;
            }
            this.fieldValue = v;
            if (!this.pending) {
                if (this.options.onChange || this.options.changeFilter) {
                    this.options.onChange && this.options.onChange(v);
                    this.options.changeFilter && this.$emit("search");
                }
            }
        });

        if (this.options.watch) {
            var watchs, rebuild;
            if (
                Sunset.isString(this.options.watch) &&
                Sunset.isFunction(this.options.rebuild)
            ) {
                watchs = this.options.watch;
                rebuild = this.options.rebuild;
            } else if (Sunset.isArray(this.options.watch)) {
                if (
                    Sunset.isString(this.options.watch[0]) &&
                    Sunset.isFunction(this.options.watch[1])
                ) {
                    watchs = this.options.watch[0];
                    rebuild = this.options.watch[1];
                }
            }
            //监听重建
            if (watchs && rebuild) {
                watchs.split(",").forEach(w => {
                    this.$watch(`filter.${w}`, v => {
                        this.rebuild(watchs, rebuild);
                    });
                });
                this.rebuild(watchs, rebuild);
            }
        }
    },
    watch: {
        fieldValue(v) {
            this.$emit("change", v);
        }
    }
};
</script>