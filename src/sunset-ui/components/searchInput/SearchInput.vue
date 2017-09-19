<style lang="sass">
    .sunset-searchinput {
        width: 100%;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        padding: 0 0px 0 0px;
        min-height: 32px;
        outline: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        position: relative;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #d7dde4;
        -webkit-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        &.have-all {
            padding: 0 24px 0 0px;
        }
        &.no-multi {
            &>input {
                width: 100%;
            }
        }
        &>input {
            display: inline-block;
            height: 32px;
            padding: 0 24px 0 8px;
            font-size: 12px;
            outline: 0;
            border: none;
            box-sizing: border-box;
            color: #657180;
            background-color: transparent;
            position: relative;
            cursor: pointer;
            height: 29px;
            line-height: 32px;
            padding: 0 4px 0 4px;
            min-width: 20px;
        }
         :-moz-placeholder {
            color: #c3cbd6;
            opacity: 1;
        }
         ::-moz-placeholder {
            color: #c3cbd6;
            opacity: 1;
        }
        input:-ms-input-placeholder {
            color: #c3cbd6;
            opacity: 1;
        }

        input::-webkit-input-placeholder {
            color: #c3cbd6;
            opacity: 1;
        }
        .sunset-searchinput-result {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            padding: 0 8px;
            border: 1px solid #e3e8ee;
            border-radius: 3px;
            background: #f7f7f7;
            font-size: 12px;
            vertical-align: middle;
            opacity: 1;
            overflow: hidden;
            cursor: pointer;
            color: #657180;
            margin: 3px 2px 2px 2px;
            &:hover {
                opacity: .85;
            }
            i {
                display: inline-block;
                font-size: 14px;
                -webkit-transform: scale(1.42857143) rotate(0);
                transform: scale(1.42857143) rotate(0);
                cursor: pointer;
                margin-left: 8px;
                color: #666;
                opacity: .66;
                position: relative;
                top: 1px;
                &:hover {
                    color: #333;
                    opacity: 1;
                }
            }
        }

        .sunset-searchinput-searchresults {
            position: absolute;
            top: 100%;
            left: -1px;
            margin-top: 0px;
            border: 1px solid #ccc;
            background: #FFF;
            z-index: 1;
            width: inherit;
            max-height: 200px;
            overflow: auto;
            margin: 5px 0;
            padding: 5px 0;
            background-color: #fff;
            box-sizing: border-box;
            position: absolute;
            z-index: 900;
            border-radius: 3px;
            &>div {
                box-sizing: border-box;
                padding: 7px 16px;
                cursor: pointer;
                &.active {
                    background: #f3f3f3;
                }
                &.selected {
                    color: rgba(51, 153, 255, .9);
                    &:after {
                        display: inline-block;
                        font-family: Ionicons;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 1;
                        float: right;
                        font-size: 24px;
                        content: '\F3FD';
                        color: rgba(51, 153, 255, .9);
                        margin-top: -3px;
                    }
                }
                &:hover {
                    background: #f3f3f3;
                }
            }
        }
        .searchinput-select-trigger {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 100%;
            width: 24px;
            &>i {
                display: inline-block;
                font-family: Ionicons;
                font-style: normal;
                font-weight: 400;
                position: absolute;
                top: 50%;
                right: 8px;
                line-height: 1;
                margin-top: -7px;
                font-size: 14px;
                color: #9ea7b4;
                -webkit-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
                &:before {
                    content: "\F104";
                }
                &.open {
                    -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
            }
        }

        &.small {
            min-height: 24px;
            &>input {
                height: 22px;
                line-height: 22px;
            }
            .sunset-searchinput-result {
                height: 20px;
                line-height: 20px;
                margin: 0px 2px 1px 1px;
            }
        }
    }
</style>
<template>
    <div :class="['sunset-searchinput',all?'have-all':'',size,!multi?'no-multi':'']" @click="focus">
        <span class="sunset-searchinput-result" v-for="r in results" track-by="$index">
            {{formatTemplate(r)}}
           <i class="ivu-icon ivu-icon-ios-close-empty" @click="remove(r)"></i>
        </span>
        <input @input="inputSearch" @keydown.stop="toSelect" @blur="blur" :placeholder="placeholder" :maxlength="maxlength" v-model="inputValue"
            type="text" />
        <div :style="popStyle" v-show="searchResults.length" class="sunset-searchinput-searchresults">
            <div :class="['sunset-searchinput-searchresult',activeSelectItem==sr?'active':'',isSelected(sr)?'selected':'']" v-for="sr in searchResults"
                @click.stop="select(sr,true,true)" track-by="$index">
                {{{template(sr)}}}
            </div>
        </div>
        <div v-if="all" class="searchinput-select-trigger" @click.stop="openAll">
            <i :class="[searchResults.length?'open':'']"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            options: {},
            size: {
                default: 'normal'
            },
            value: {}
        },
        data() {
            return {
                inputValue: '',
                searchResults: [],
                results: [],
                delayTimer: null,
                activeSelectItem: null,
                bodyClick: (ev) => {
                    if (!$(ev.target).closest($(this.$el)).length) {
                        this.searchResults = [];
                    }
                },
                lock: false,
                selecting: false
            }
        },
        computed: {
            maxlength() {
                return this.options.maxlength || this.options.validate && (Sunset.isNumber(this.options.validate.maxlength) ?
                    this.options.validate.maxlength : (this.options
                        .validate.maxlength && this.options
                        .validate.maxlength.rule));
            },
            delay() {
                return Sunset.isNumber(this.options && this.options.delay) ? this.options.delay : 100;
            },
            search() {
                return Sunset.isFunction(this.options && this.options.search) ? this.options.search : null;
            },
            check() {
                return Sunset.isFunction(this.options && this.options.check) ? this.options.check : null;
            },
            multi() {
                return this.options && (this.options.multi || this.options.multiple);
            },
            spliter() {
                return this.options && this.options.spliter || ',';
            },
            placeholder() {
                return this.options && this.results.length == 0 && this.options.placeholder;
            },
            all() {
                return this.options && this.options.all;
            },
            inputable() {
                return !(this.options.input === false || this.options.inputable === false);
            },
            template() {
                return Sunset.isFunction(this.options && this.options.template) ? this.options.template :
                    function (v) {
                        return v
                    };
            },
            format() {
                return Sunset.isFunction(this.options && this.options.format) ? this.options.format :
                    function (v) {
                        return v
                    };
            },
            formatTemplate() {
                return Sunset.isFunction(this.options && this.options.formatTemplate) ? this.options.formatTemplate :
                    function (v) {
                        return v
                    };
            },
            popStyle() {
                return this.options && this.options.popStyle || {};
            }
        },
        methods: {
            toSelect(ev) {
                switch (ev.keyCode) {
                    case 38:
                        this.activeSearchResultItem(-1);
                        break;
                    case 40:
                        this.activeSearchResultItem(1);
                        break;
                    case 13:
                        var active = null;
                        if (this.activeSelectItem != null && (~this.searchResults.indexOf(this.activeSelectItem))) {
                            active = this.activeSelectItem;
                        }
                        if (active) {
                            this.select(active, true);
                            if (!this.multi) {
                                this.activeSelectItem = null;
                            }
                        } else if (this.inputable && this.multi && this.inputValue.trim() != '') {
                            this.select(this.inputValue);
                        }
                        break;
                    case 8:
                        if (this.inputValue === '') {
                            if (this.results.length) {
                                this.results.pop();
                            }
                        }
                        break;
                }
                setTimeout(() => {
                    var $wrap = $('.sunset-searchinput-searchresults', this.$el);
                    var $activer = $('.sunset-searchinput-searchresult.active', this.$el);
                    var height = parseInt($activer.css('height'));
                    if ($activer && $activer.length) {
                        var offsetParentTop = $activer.offset().top - $activer.offsetParent().offset().top,
                            diff = ($activer.index() + 1) * height - $wrap.height();
                        if (diff > 0) {
                            $wrap.scrollTop(diff);
                        } else {
                            $wrap.scrollTop(0);
                        }
                    }
                }, 0);
            },
            isSelected(item) {
                var text = this.format(item);
                return ~this.results.indexOf(text);
            },
            activeSearchResultItem(which) {
                var list = this.searchResults,
                    current = this.activeSelectItem,
                    length = list.length;
                if (current == null) {
                    current = which > 0 ? list[0] : list[(length -
                        1)];
                } else {
                    var index = list.indexOf(current);
                    index += which;
                    if (index < 0) {
                        index += length;
                    }
                    index %= length;
                    current = list[index];
                }
                this.activeSelectItem = current;
            },
            select(v, fromSearchResult, fromClick) {
                if (fromClick) {
                    this.activeSelectItem = null;
                }
                if (this.check && (this.check.call(null, v) === false)) {
                    return;
                }
                this.selecting = true;
                var text = v;
                if (fromSearchResult) {
                    this.$emit('selected', v);
                    Sunset.isFunction(this.options && this.options.onSelected) && this.options.onSelected.call(null, v);
                    text = this.format(v);
                }
                if (this.multi) {
                    var index = this.results.indexOf(text);
                    if (index < 0) {
                        this.results.push(text);
                    } else if (fromSearchResult) {
                        this.results.splice(index, 1);
                    }
                    this.inputValue = '';
                } else {
                    //单选
                    this.inputValue = text;
                    this.searchResults = [];
                }
                this.$nextTick(() => {
                    this.selecting = false;
                });
            },
            remove(item) {
                this.results.splice(this.results.indexOf(item), 1);
            },
            inputSearch() {
                if (this.search) {
                    clearTimeout(this.delayTimer);
                    this.delayTimer = setTimeout(() => {
                        this.searchFilter(this.inputValue);
                    }, this.delay);
                }
            },
            searchFilter(keyword) {
                if (this.search) {
                    Promise.resolve(this.search.call(null, keyword)).then(res => {
                        if (res != null) {
                            if (!Sunset.isArray(res)) {
                                res = [res];
                            }
                            this.searchResults = res;
                        }
                    });
                }
            },
            openAll() {
                var all = this.all;
                if (this.searchResults.length) {
                    this.searchResults = [];
                } else {
                    if (all) {
                        Promise.resolve().then(() => {
                            if (Sunset.isFunction(all)) {
                                return all();
                            } else {
                                return all;
                            }
                        }).then(res => {
                            if (res != null) {
                                if (!Sunset.isArray(res)) {
                                    res = [res];
                                }
                                this.searchResults = res;
                            }
                        });
                    }
                }
            },
            focus() {
                this.openAll();
                $('input', this.$el).focus();
            },
            blur() {
                if (this.inputable) {
                    setTimeout(() => {
                        if (!this.selecting) {
                            this.toSelect({
                                keyCode: 13
                            });
                        }
                    }, 200)
                }
            },
            setValue(v) {
                this.lock = true;
                if (!this.multi) {
                    this.inputValue = v;
                } else {
                    if (Sunset.isString(v) && v.length) {
                        this.results = v.split(this.spliter);
                    } else {
                        this.results = [];
                    }
                }
                this.$nextTick(() => {
                    this.lock = false;
                });
            }
        },
        watch: {
            inputValue(v) {
                if (!this.lock && !this.multi) {
                    this.value = v;
                    this.$nextTick(() => {
                        this.value = v;
                    });
                }
            },
            results(v) {
                if (!this.lock && this.multi) {
                    this.value = v.join(this.spliter);
                }
            },
            value(v) {
                this.setValue(v == null ? '' : (v + ''));
            }
        },
        ready() {
            this.setValue(this.value);
            $('body').bind('click', this.bodyClick);
        },
        destroyed() {
            $('body').unbind('click', this.bodyClick);
        }
    }
</script>