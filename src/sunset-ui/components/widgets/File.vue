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

    .sunset-upload-item-wrap {
        position: relative;
        border: 1px solid #eee;
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
        font-size: 0px;
        .upload-thumbnail-wrap {
            display: inline-block;
        }
        img {
            width: 100%;
            height: 100%;
        }
        .sunset-upload-item-shim {
            position: absolute;
            top: 0px;
            z-index: 1;
            left: 0px;
            right: 0px;
            background: rgba(0, 0, 0, 0.7);
            transition: 0.5s;
        }
        .sunset-upload-item-remove {
            position: absolute;
            top: 2px;
            z-index: 2;
            right: 2px;
            color: #FFF;
            font-size: 18px;
            &:hover {
                color: #d9534f;
            }
        }
        &.readonly {
            .sunset-upload-item-remove {
                display: none;
            }
        }
    }
</style>
<template>
    <div class="sunset-field">
        <!-- thumbnail start -->
        <div v-for="item in queue" :class="['sunset-upload-item-wrap',options.readonly?'readonly':'']">
            <Icon class="sunset-upload-item-remove" type="close-round" @click="remove(item)"></Icon>
            <div class="upload-thumbnail-wrap" :style="thumbnailStyle">
                {{{thumbnail(item)}}}
            </div>
            <div v-show="!item.src" class="sunset-upload-item-shim" :style="{height:((100-(item.progress||0)*100)+'%')}"></div>
        </div>
        <!-- thumbnail end -->
        <sunset-file v-if="!options.readonly" v-ref:file :options="options" :queue="queue" :disabled="options.readonly" @queue="refreshQueue"
            @success="success">
            <template v-if="options.dom">
                {{{options.dom}}}
            </template>
        </sunset-file>
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
        computed: {
            thumbnailStyle() {
                var thumbnailSize = this.options.thumbnailSize;
                return this.options.thumbnailStyle || {
                    width: `${thumbnailSize&&thumbnailSize.width||100}px`,
                    height: `${thumbnailSize&&thumbnailSize.height||100}px`
                };
            }
        },
        methods: {
            thumbnail(item) {
                if (Sunset.isFunction(this.options.thumbnailRender)) {
                    return this.options.thumbnailRender(item.src || item.thumbnail);
                } else {
                    return `<img class="viewer-image" group="${this.options.name}" src="${item.src||item.thumbnail}" />`;
                }
            },
            refreshQueue(queue) {
                this.queue = queue;
            },
            success(queue) {
                var format = this.options.format;
                queue.forEach(item => {
                    if (!item.value) {
                        item.value = (format && format(item.result) || item.result);
                        if (Sunset.isFunction(this.options.thumbnail)) {
                            item.src = this.options.thumbnail(item.value);
                        }
                    }
                });
                this.refreshValue();
            },
            remove(data) {
                this.queue.splice(this.queue.indexOf(data), 1);
                this.refreshValue();
            },
            refreshValue() {
                this.value = this.queue.map(item => item.value).join(this.options.spliter || ',');
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