<template>
    <sunset-layout title="Sunset组件库 - Modal">
        <Tabs active-key="key1">
            <Tab-pane label="标签一" key="key1">标签一的内容</Tab-pane>
            <Tab-pane label="标签二" key="key2">标签二的内容</Tab-pane>
            <Tab-pane label="标签三" key="key3">标签三的内容</Tab-pane>
        </Tabs>
    </sunset-layout>
</template>
<script>
    import BootstrapStore from './BootstrapStore';

    const now = new Date().getTime();

    export default {
        methods: {

        },
        data() {
            return {};
        }
    };
</script>