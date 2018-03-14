<template>
    <Dropdown :trigger="disabled===true?'custom':(options.trigger)">
        <i-button :disabled="disabled===true" :size="size" :icon="options.icon" :type="options.color||'primary'">
            {{options.label}}
            <Icon type="arrow-down-b"></Icon>
        </i-button>
        <Dropdown-menu slot="list" style="text-align:left;">
            <Dropdown-item v-for="(item,index) in items" :key="index" :disabled="checkDisabled(item)" :divided="item.divided" @click="operate(item)">
                <Icon v-if="item.icon" :type="item.icon"></Icon>
                {{item.label}}
            </Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</template>
<script>
    import Helper from '../Helper.js';

    export default {
        props: {
            options: {},
            disabled: {},
            ctx: {},
            size: {}
        },
        computed: {
            items() {
                var tools = this.options.items || [];
                return tools && tools.filter(item => {
                    if (item.premise && Sunset.isFunction(item.premise)) {
                        return item.premise(this.ctx);
                    } else {
                        return true;
                    }
                });
            }
        },
        methods: {
            checkDisabled(tool) {
                var disabledValue = false;
                if (tool.disabled === true) {
                    disabledValue = true;
                } else if (Sunset.isFunction(tool.disabled)) {
                    disabledValue = !!tool.disabled(this.ctx);
                } else {
                    disabledValue = false;
                }
                return disabledValue;
            },
            operate(item) {
                if (this.checkDisabled(item)) {
                    return;
                }
                Helper.operate.call(this, item, this.ctx);
            }
        }
    }
</script>