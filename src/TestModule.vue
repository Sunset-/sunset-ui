<style lang="scss">

</style>

<template>
    <div>
        {{text}}
        <Input v-model="value" placeholder="Enter something..." icon="ios-clock-outline" style="width: 300px"></Input>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: 123
        };
    }
};
</script>

