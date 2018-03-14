<style lang="scss">
.sunset-form-field {
    display: table;
    width: 100%;
    min-height: 35px;
    margin-bottom: 15px;
    border-right: 20px solid rgba(255, 255, 255, 0);
    box-sizing: border-box;
    font-size: 0px;
    .sunset-field-label {
        font-size: 12px;
        display: table-cell;
        min-width: 80px;
        white-space: nowrap;
        text-align: right;
        padding-left: 10px;
        padding-right: 15px;
        vertical-align: middle;
    }
    .sunset-field {
        font-size: 12px;
        display: table-cell;
        width: 100%;
        vertical-align: middle;
    }
    .field-invalid-tip {
        position: absolute;
        font-size: 16px;
        top: 8px;
        right: 0px;
    }
    .sunset-form-field-remove {
        position: absolute;
        font-size: 12px;
        top: -1px;
        right: 18px;
        z-index: 5;
        &:hover {
            color: orange;
        }
    }
    &.required-field {
        .sunset-field-label:before {
            content: "*";
            color: red;
            padding: 0px 2px;
        }
    }
    $color: rgba(#464c5b, 0.9);
    .sunset-field-wraning-pop-wrap {
        display: none;
        position: absolute;
        z-index: 9999;
        padding: 5px 8px;
        background: $color;
        border: 1px solid $color;
        color: #fff;
        border-radius: 3px;
        font-size: 12px;
        right: -20px;
        top: -32px;
        &:before {
            position: absolute;
            right: 20px;
            content: "";
            width: 0px;
            height: 0px;
            border-style: solid;
            border-width: 8px 6px;
        }
        &:before {
            bottom: -17px;
            border-color: $color transparent transparent transparent;
        }
    }
}

$color: rgba(#464c5b, 0.9);

.sunset-pop {
    position: absolute;
    z-index: 9999;
    right: -20px;
    top: 10px;
    font-size: 12px;
}

.sunset-pop-wrap {
    position: absolute;
    z-index: 9998;
    padding: 5px 8px;
    background: $color;
    border: 1px solid $color;
    color: #fff;
    border-radius: 3px;
    font-size: 12px;
    &:before {
        position: absolute;
        right: 20px;
        content: "";
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 8px 6px;
    }
    &:before {
        bottom: -17px;
        border-color: $color transparent transparent transparent;
    }
}
</style>
<template>
    <div :class="['sunset-form-field',options.validate&&options.validate.required?'required-field':'',options.fieldClass]" :style="options.fieldClass">
        <label v-if="options.label" :style="labelStyle" class="sunset-field-label" v-html="options.label"></label>
        <component :is="widget" :ref="widget" :options="options" :form-options="formOptions" v-model="fieldValue" :model="model" :invalid="invalid" @ready="widgetReady" :style="options.style"></component>
        <input type="hidden" field="field" v-model="fieldValue" :name="options.name" v-validate="options.validate" />
        <div v-show="invalid" class="sunset-field-wraning-pop-wrap">{{$validator.$firstError(options.name)}}</div>
        <i v-show="$validator.$invalid(options.name)" class="field-invalid-tip ivu-icon ivu-icon-information-circled text-warning sunset-pop" :data-content="$validator.$firstError(options.name)"></i>
        <i v-if="options.removeable" :style="options.removeStyle" @click="removeSelf" class="sunset-form-field-remove ivu-icon ivu-icon-close-circled text-danger"></i>
   <div style="font-size:12px;">{{fieldValue}}</div>
    </div>
</template>
<script>
import widgets from "../widgets/index.js";

var RULE_MESSAGE_REPLACES = {
    required: "FIELD不能为空",
    min: "FIELD不能小于RULE",
    max: "FIELD不能大于RULE",
    maxlength: "最大长度为RULE",
    minlength: "最小长度为RULE"
};

export default {
    components: widgets,
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        formOptions: {},
        options: {
            type: Object
        },
        value: {},
        model: {}
    },
    data() {
        return {
            fieldValue: this.value
        };
    },
    computed: {
        labelStyle() {
            if (this.options.labelStyle) {
                return this.options.labelStyle;
            } else if (this.formOptions.labelWidth) {
                return `min-width:${this.formOptions.labelWidth}px`;
            } else {
                return `min-width:${Sunset.getConfig(
                    "FORM_FIELD_LABEL_WIDTH",
                    80
                )}px`;
            }
        },
        widget() {
            return "widget-" + (this.options.widget || this.options.type);
        },
        invalid() {
            // if (this.options.validate && this.$validation.field.invalid) {
            //     return (
            //         this.$validation.field.errors &&
            //         this.$validation.field.errors.length &&
            //         this.$validation.field.errors[0].message
            //     );
            // }
            return null;
        },
        removeable() {
            return Sunset.isFunction(this.options.removeable)
                ? this.options.removeable.call(
                      this.options,
                      this.value,
                      this.model
                  )
                : this.options.removeable;
        }
    },
    methods: {
        widgetReady(name, defaultValue) {
            this.$emit("ready", name, defaultValue);
        },
        generateWatchDependent(watchs) {
            var dep = {},
                model = this.model;
            watchs.split(",").forEach(w => {
                dep[w] = model[w];
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
                        this.model,
                        this.formOptions
                    );
                })
                .then(res => {
                    if (res !== false) {
                        this.$children[0].init && this.$children[0].init();
                    }
                });
        },
        removeSelf() {
            this.$emit("remove");
        }
    },
    mounted() {
        //监听变化
        this.$watch("value", function(v, oldValue) {
            this.options.onChange &&
                this.options.onChange(
                    v,
                    this.model,
                    this.$parent.$parent.$parent,
                    this.options,
                    this.formOptions,
                    oldValue
                );
            this.fieldValue = v;
            this.$emit("change", v, this.model, this.options);
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
                    this.$watch(`model.${w}`, v => {
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