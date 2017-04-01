<template>
    <div></div>
</template>
<script>
    export default {
        props: {
            options: {}
        },
        data() {
            return {
                chart: null
            };
        },
        methods: {
            refresh() {
                if (!this.chart) {
                    this.chart = echarts.init(this.$el);
                    this.$el.addEventListener('resize', () => {
                        this.chart.resize();
                    }, false);
                }
                this.chart.setOption(this.options);
            },
            getInstance() {
                return this.chart;
            }
        },
        watch: {
            options(v) {
                this.refresh();
            }
        },
        attached() {
            this.refresh();
        }
    }
</script>