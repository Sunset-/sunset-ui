<style lang="sass">
    .sunset-loading-contaier {
        position: relative;
        .sunset-loading-shim {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            z-index: 1;
            .sunset-loading-spin {
                background: rgba(255, 255, 255, 0.5);
            }
            .demo-spin-icon-load {
                animation: ani-demo-spin 1s linear infinite;
            }
            @keyframes ani-demo-spin {
                from {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(180deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
    }
</style>
<template>
    <div class="sunset-loading-contaier">
        <slot></slot>
        <div v-show="loading" class="sunset-loading-shim" :style="loadingStyle">
            <Spin fix class="sunset-loading-spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中...</div>
            </Spin>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            loading: {},
            top: {

            }
        },
        computed: {
            loadingStyle() {
                return {
                    top: (this.top || 0) + 'px'
                }
            }
        }
    }
</script>