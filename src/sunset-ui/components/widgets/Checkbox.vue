<style>
    .checkbox-group-wrap .ivu-checkbox-group {
        padding-top: 6px;
        height: 32px;
    }
</style>
<template>
    <div :class="['sunset-field-wrap',invalid?'field-invalid':'']">
        <label class="sunset-field-label">{{options.label}}</label>
        <div class="sunset-field checkbox-group-wrap">
            <Checkbox-group v-if="items.length" :model.sync="model">
                <Checkbox v-for="item in items" :value="item.value" :disabled="item.disabled">
                    <span>{{item.text}}</span>
                </Checkbox>
            </Checkbox-group>
        </div>
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
                items: []
            };
        },
        computed: {
            model: {
                set(v) {
                    var items;
                    if (Sunset.isArray(v)) {
                        items = v;
                    } else {
                        items = v && v.split(',') || [];
                    }
                    this.value = items;
                },
                get() {
                    var v = this.value;
                    if (Sunset.isArray(v)) {
                        return this.value
                    } else {
                        return (this.value = v && v.split(',') || []);
                    }
                }
            }
        },
        methods: {
            init() {
                Utils.generateItems(this.options).then(items => {
                    this.items = items;
                });
            }
        },
        ready() {
            this.init();
        }
    };
</script>