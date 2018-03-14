<template>
    <div class="sunset-field">
        <Cascader ref="cascader" :data="data" v-model="widgetValue" :size="options.size" :trigger="options.trigger" :change-on-select="options.changeOnSelect"></Cascader>
    </div>
</template>
<script>
import regionJSON from "../data/regionJSON.js";
var RegionJSON = null;

function generateCascaderData(list) {
    return (
        RegionJSON ||
        list.map(item => {
            var children;
            if (item.sub) {
                children = generateCascaderData(item.sub);
            }
            return {
                label: item.name,
                value: item.name,
                children: children
            };
        })
    );
}

export default {
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        options: {
            type: Object
        },
        value: {}
    },
    data() {
        return {
            data: [],
            widgetValue: []
        };
    },
    computed: {
        spliter() {
            return this.options.spliter || ",";
        }
    },
    methods: {
        init() {
            Promise.resolve()
                .then(res => {
                    if (Sunset.isFunction(this.options.data)) {
                        return this.options.data.apply(this.options);
                    } else {
                        return this.options.data;
                    }
                })
                .then(data => {
                    this.data = data;
                    this.watchedValue(this.value);
                });
        },
        watchedValue(v) {
            this.widgetValue = Sunset.isArray(v)
                ? v
                : (v ? new String(v) : "").split(this.spliter);
        },
        watchedWidgetValue(v) {
            var value = v && v.join(this.spliter);
            this.$emit("input", value);
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        value(v) {
            this.watchedValue(v);
        },
        widgetValue(v) {
            this.watchedWidgetValue(v);
        }
    }
};
</script>