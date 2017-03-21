<template>
    <Dropdown>
        <i-button :size="size" :icon="options.icon" :type="options.color||'primary'">
            {{options.label}}
            <Icon type="arrow-down-b"></Icon>
        </i-button>
        <Dropdown-menu slot="list" style="text-align:left;">
            <Dropdown-item v-for="item in options.items" :divided="item.divided" @click="operate(item)">
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
            ctx: {},
            size: {}
        },
        methods: {
            operate(item) {
                Helper.operate(item, this.ctx);
            }
        }
    }
</script>