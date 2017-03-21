<style lang="sass">
    body,
    html {
        height: 100%;
        margin: 0;
        padding: 0;
        border: none;
    }
    
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }
    
    .sunset-container {
        display: table;
        width: 100%;
        height: 100%;
        vertical-align: top;
        border-collapse: collapse;
        border-spacing: 0px;
        table-layout: fixed;
        .sunset-leftside {
            display: table-cell;
            position: relative;
            width: 300px;
            background: #2c2e2f;
            z-index: 1;
        }
        .sunset-content {
            display: table-cell;
            position: relative;
            z-index: 0;
            padding-bottom: 0;
            vertical-align: top;
            word-break: break-word;
        }
    }
</style>
<template>
    <div class="sunset-container">
        <div class="sunset-leftside" :style="{width:leftWidth+'px'}">
            <slot name="leftside"></slot>
        </div>
        <div class="sunset-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                leftWidth: 240
            }
        },
        methods: {
            changeSideWidth(leftWidth) {
                this.leftWidth = leftWidth;
            }
        }
    };
</script>