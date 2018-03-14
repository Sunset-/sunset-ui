<style lang="scss">
    .sunset-field-wrap {
        .radio-group-wrap.radio-pd {
            .ivu-radio-group {
                padding-top: 6px;
            }
        }
        .ivu-radio-group {
            height: 32px;
        }
    }
</style>
<template>
    <div :class="['sunset-field radio-group-wrap',options.type=='button'?'':'radio-pd']">
        <Radio-group :type="options.type" :size="options.size" :model.sync="value">
            <Radio v-for="item in items" :value="item.value" :disabled="item.disabled">
                <span>{{item.text}}</span>
            </Radio>
        </Radio-group>
    </div>
</template>
<script>
    import Utils from '../Helper.js';

    export default {
        props: {
            options: {
                type: Object
            },
            value: {}
        },
        data() {
            return {
                items: [],
                lock: false,
                widgetLock: false,
                widgetValue: null
            };
        },
        computed: {
            type() {
                return this.options.type == 'input' ? 'text' : this.options.type;
            }
        },
        methods: {
            init() {
                this.$emit('pending');
                Utils.generateItems(this.options).then(items => {
                    this.items = items;
                    if (this.options.defaultFirst && (this.value === void 0 || this.value.length == 0) && this.items
                        .length) {
                        this.value = this.items[0].value;
                    }
                    this.$nextTick(() => {
                        var v = this.value;
                        this.value = void 0;
                        this.$nextTick(() => {
                            this.value = v;
                            this.$nextTick(() => {
                                this.$emit('ready', this.options.name, this.value);
                            });
                        });
                    });
                });
            },
            // ,
            // refreshWidgetValue(v) {
            //     this.widgetLock = true;
            //     this.widgetValue = void 0;
            //     this.$nextTick(() => {
            //         this.widgetValue = v;
            //         this.widgetLock = false;
            //     });
            // }
        },
        watch: {
            // widgetValue(v) {
            //     if (!this.widgetLock) {
            //         this.lock = true;
            //         this.value = v;
            //         this.$nextTick(() => {
            //             this.lock = false;
            //         });
            //     }
            // },
            value(v) {
                this.value = v;
            }
        },
        mounted(){
            this.init();
			this.$watch('options.data',function(){
				this.init();
			});
			this.$watch('options.enum',function(){
				this.init();
			});
        }
    };
</script>