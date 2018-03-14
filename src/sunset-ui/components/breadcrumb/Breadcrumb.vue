<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="path in paths" :key="path" href="javascript:;" @click="goPath(path,$index)">{{path.title}}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
    export default {
        props: {
            options: {}
        },
        data() {
            return {
                paths: []
            }
        },
        methods: {
            append(path) {
                this.paths.push(path);
            },
            pop(path) {
                this.paths.pop();
            },
            goPath(path, index) {
                this.paths.splice(index + 1, this.paths.length - index - 1);
                this.$emit('route', path);
            }
        }

    }
</script>