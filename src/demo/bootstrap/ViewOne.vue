<template>
    <div>
        <input type="text" v-model="v" />
        <button type="button" @click="save">保存</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                v: ''
            }
        },
        methods: {
            save() {
                this.$emit('signal', 'save', this.v);
            },
            setValue(v) {
                this.v = v;
            }
        }
    }
</script>