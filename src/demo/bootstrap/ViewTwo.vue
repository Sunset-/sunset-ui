<template>
    <div>
        显示信息：{{v1}}-{{v2}}
    </div>
</template>

<script>
    export default {
        props: {
            options: {

            },
            data: {

            }
        },
        data() {
            return {
                v1: '',
                v2: ''
            }
        },
        methods: {
            show1(v) {
                this.v1 = v;
            },
            show2(v) {
                this.v2 = v;
            }
        },
        ready() {
            this.v = this.data;
        }
    }
</script>