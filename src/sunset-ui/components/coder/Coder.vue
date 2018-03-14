<style lang="scss">
.sunset-coder-container {
    width: 100%;
    min-height: 100px;
}
</style>
<template>
	<div :id="id" :style="style" :class="['sunset-coder-container',readOnly?'sunset-coder-readonly':'']">
	</div>
</template>
<script>
var uid = 0;

export default {
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        options: {},
        value: {},
        height: {},
        readonly: {}
    },
    data() {
        return {
            id: "",
            widgetValue: this.value,
            waitValue: null,
            ready: false,
            pending: false
        };
    },
    computed: {
        theme() {
            return (this.options && this.options.theme) || "ace/theme/monokai";
        },
        mode() {
            return (this.options && this.options.mode) || "ace/mode/javascript";
        },
        readOnly() {
            return this.readonly === true || this.readonly === "";
        },
        style() {
            return (this.options && this.options.style) || "";
        }
    },
    methods: {
        init() {
            if (!ace) {
                throw new Error("请装载AceCode组件");
            }
            this.id = `sunset-coder-${++uid}`;
            this.$nextTick(() => {
                var coder = (this.coder = ace.edit(this.id));
                coder.setTheme(this.theme);
                coder.getSession().setMode(this.mode);
                // if (this.height && !isNaN(+this.height)) {
                // 	editor.setHeight(+this.height);
                // }
                coder.setValue(this.waitValue || this.widgetValue || "");
                this.ready = true;
                //监听
                coder.on("change", () => {
                    this.widgetValue = coder.getValue();
                });
                coder.on("blur", () => {
                    this.widgetValue = coder.getValue();
                });
                coder.on("focus", () => {
                    this.$emit("focus");
                });
                //只读
                if (this.readOnly) {
                    coder.setReadOnly(true);
                }
                this.ready = true;
            });
        },
        getcoder() {
            return this.coder;
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        widgetValue(v) {
            this.pending = true;
            this.$emit("input", v);
            this.$nextTick(() => {
                this.pending = false;
            });
        },
        value(v) {
            if (!this.pending) {
                if (this.ready) {
                    this.coder && this.coder.setValue(v || "");
                    this.coder && this.coder.focus(true);
                } else {
                    this.waitValue = v;
                }
            }
        },
        readonly(v) {
            try {
                //只读
                if (!!v) {
                    this.coder && this.coder.setReadOnly(true);
                } else {
                    this.coder && this.coder.setReadOnly(false);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    }
};
</script>