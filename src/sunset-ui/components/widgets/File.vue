<style lang="sass">
    @import '../../style/index.scss';
    .widget-upload-btn {
        position: relative;
        display: block;
        width: 60px;
        height: 60px;
        line-height: 29px;
        padding: 0px;
        border: 2px solid $border;
        background: #FFF;
        color: #FFF;
        overflow: hidden;
        &>div {
            height: 100%;
            width: 100%;
            z-index: 1;
        }
        &:before {
            content: '';
            position: absolute;
            z-index: 0;
            left: 10%;
            width: 80%;
            top: 50%;
            margin-top: -2px;
            height: 4px;
            background: $border;
            cursor: pointer;
        }
        &:after {
            content: '';
            position: absolute;
            z-index: 0;
            left: 50%;
            margin-left: -2px;
            top: 10%;
            height: 80%;
            width: 4px;
            background: $border;
            cursor: pointer;
        }
        &:hover {
            border: 2px solid darken($border, 10%);
            &:before {
                background: darken($border, 10%);
            }
            &:after {
                background: darken($border, 10%);
            }
        }
    }
</style>
<template>
    <div :class="['sunset-field-wrap']">
        <label class="sunset-field-label">{{options.label}}</label>
        <div class="sunset-field">
            <upload-image v-for="item in queue" :data.sync="item" :size="options.thumbnailSize" @remove="remove"></upload-image>
            <sunset-file v-ref:file :options="options" :queue="queue" @queue="refreshQueue" @success="success"></sunset-file>
        </div>
    </div>
</template>
<script>
    import UploadImage from './tablet/UploadImage.vue';


    export default {
        components: {
            UploadImage
        },
        props: {
            options: {
                type: Object
            },
            value: {

            }
        },
        data() {
            return {
                pending: false,
                queue: []
            };
        },
        methods: {
            refreshQueue(queue) {
                this.queue = queue;
            },
            success(queue) {
                var format = this.options.format;
                queue.forEach(item => {
                    item.value = format && format(item.result) || item.result;
                });
                this.refreshValue();
            },
            remove(data) {
                this.queue.splice(this.queue.indexOf(data), 1);
                this.refreshValue();
            },
            refreshValue() {
                this.pending = true;
                this.value = this.queue.map(item => item.value).join(this.options.spliter || ',');
                this.$nextTick(() => {
                    this.pending = false;
                });
            }
        },
        watch: {
            value(value) {
                if (!this.pending) {
                    var queue = this.queue;
                    queue.splice(0, queue.length);
                    if (value && value.length) {
                        var thumbnail = this.options.thumbnail;
                        value.split(this.options.spliter || ',').forEach(v => {
                            queue.push({
                                src: Sunset.isFunction(thumbnail) ? (thumbnail(v) || v) : (
                                    thumbnail || v),
                                value: v
                            });
                        });
                        this.pending = false;
                    } else {
                        while (queue.pop()) {}
                    }
                    this.pending = false;
                }
            }
        }
    }
</script>