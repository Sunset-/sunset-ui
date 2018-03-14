<style lang="scss">
.editor-container {
    position: relative;
}
</style>
<template>
	<div class="sunset-field editor-container">
		<div>
			<sunset-editor ref="editor" :height="options.height" v-model="widgetValue" :readonly="options.readonly" :toolbar="options.toolbar" :options="options.editorOptions" @focus="focus" @blur="blur"></sunset-editor>
		</div>
	</div>
</template>
<script>
export default {
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        options: {
            type: Object
        },
        value: {},
        model: {}
    },
    data() {
        return {
            width: 0,
            inited: false,
            widgetValue: this.value
        };
    },
    methods: {
        focus() {
            if (Sunset.isFunction(this.options.focus)) {
                this.options.focus.call(this.options, this.value, this.model);
            }
        },
        blur() {
            if (Sunset.isFunction(this.options.blur)) {
                this.options.blur.call(this.options, this.value, this.model);
            }
        }
    },
    watch: {
        // REFRESH_WIDGET_VALUE() {
        // 	if (!this.inited) {
        // 		this.inited = true;
        // 		this.$nextTick(() => {
        // 			this.$refs.editor.setWidth($(this.$el).width() + 'px');
        // 		});
        // 	} else {
        // 		this.value = '';
        // 	}
        // 	//this.$refs.editor.setValueSilent(this.value);
        // }
        widgetValue(v) {
            this.$emit("input", v);
        },
        value(v) {
            this.widgetValue = v;
        }
    }
};
</script>