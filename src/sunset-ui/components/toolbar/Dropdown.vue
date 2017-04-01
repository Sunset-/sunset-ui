<template>
    <Dropdown :trigger="disabled===true?'custom':(options.trigger)">
        <i-button :disabled="disabled===true" :size="size" :icon="options.icon" :type="options.color||'primary'">
            {{options.label}}
            <Icon type="arrow-down-b"></Icon>
        </i-button>
        <Dropdown-menu slot="list" style="text-align:left;">
            <Dropdown-item v-for="item in items" :disabled="item.disabledValue" :divided="item.divided" @click="operate(item)">
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
            disabled : {},
            ctx: {},
            size: {}
        },
        computed: {
            items() {
                var tools = this.options.items || [];
                return tools && tools.filter(item => {
                    if (item.disabled === true) {
                        item.disabledValue = true;
                    } else if (Sunset.isFunction(item.disabled)) {
                        item.disabledValue = !!item.disabled(this.ctx);
                    } else {
                        item.disabledValue = false;
                    }
                    if (item.premise && Sunset.isFunction(item.premise)) {
                        return item.premise(this.ctx);
                    } else {
                        return true;
                    }
                });
            }
        },
        methods: {
            operate(item) {
                Helper.operate.call(this, item, this.ctx);
            }
        }
    }
</script>