<style>
    .radio-group-wrap .ivu-radio-group {
        height: 32px;
    }
    
    .radio-group-wrap.radio-pd .ivu-radio-group {
        padding-top: 6px;
    }
</style>
<template>
    <div :class="['sunset-field-wrap',invalid?'field-invalid':'',options.type=='button'?'':'radio-pd']">
        <label v-if="options.label" class="sunset-field-label">{{options.label}}</label>
        <div class="sunset-field radio-group-wrap">
            <Radio-group v-if="items.length" :type="options.type" :size="options.size" :model.sync="value">
                <Radio v-for="item in items" :value="item.value" :disabled="item.disabled">
                    <span>{{item.text}}</span>
                </Radio>
            </Radio-group>
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
            type() {
                return this.options.type == 'input' ? 'text' : this.options.type;
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