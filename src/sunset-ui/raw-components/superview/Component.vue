<template>
    <div :style="component.style" :class="component.className">
        <component :is="component.component" :options="component.options" :data="component.data">
        </component>
    </div>
</template>

<script>
    export default {
        props: {
            component: {}
        }
    }
</script>