<template>
    <div v-echarts="options"></div>
</template>
<script>
    export default {
        props: {
            options: {}
        },
        methods: {
            refresh() {
                this.options = Sunset.clone(this.options);
            }
        }
    }
</script>