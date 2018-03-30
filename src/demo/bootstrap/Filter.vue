<style lang="sass">

</style>
<template>
    <h2>Filter</h2>
    <div class="component-wrap">
        <sunset-filter v-ref:filter :options="options" @filter="filter"></sunset-filter>
        <button type="button" @click="refresh">refresh</button>
    </div>
</template>
<script>

    var items = [{
        id: 1,
        name: 'aaa'
    }, {
        id: 2,
        name: 'bbb'
    }, {
        id: 3,
        name: 'ccc'
    }];

export default {
    ready() {
        // setTimeout(()=>{
        //     console.error('RESET')
        //     this.$refs.filter.reset({
        //         keyword : 'aaa',
        //         sex1 : '1'
        //     })
        // },3000)
    },
    methods: {
        refresh() {
            this.options.fields[5].data = {
                "3": "花",
                "4": "鸟"
            };
        },
        filter(a, b) {
            alert(JSON.stringify(a));
            console.warn(JSON.stringify(a));
        }
    },
    data() {
        return {
            options: {
                fields: [
                    {
                        name: "keyword",
                        placeholder: "关键字",
                        widget: "input"
                    },
                    {
                        label: "",
                        name: "sexdefault",
                        placeholder: "性别",
                        widget: "select",
                        style: {
                            width: "100px"
                        },
                        changeFilter: true,
                        // defaultFirst:true,
                        default: "2",
                        enum: "",
                        data: {
                            "1": "男",
                            "2": "女"
                        }
                    },
                    {
                        label: "输入查询",
                        name: "searchinput",
                        widget: "searchinput",
                        placeholder: "不能为空",
                        default() {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve("4,6");
                                }, 200);
                            });
                        },
                        delay: 0,
                        multi: true,
                        check(v) {
                            if (v.length > 10) {
                                return false;
                            }
                        },
                        popStyle: "width:150px",
                        all() {
                            return items;
                        },
                        onSelected(v) {},
                        search(keyword) {
                            return items;
                        },
                        format(item) {
                            return item.name;
                        },
                        // all: items,
                        validate: {
                            required: true
                        }
                    },
                    {
                        name: "keyword",
                        placeholder: "关键字",
                        widget: "input"
                    },
                    {
                        label: "",
                        name: "sexdefault",
                        placeholder: "性别",
                        widget: "select",
                        style: {
                            width: "100px"
                        },
                        changeFilter: true,
                        // defaultFirst: true,
                        default: "2",
                        data: {
                            "1": "男",
                            "2": "女"
                        }
                    },
                    {
                        name: "sexfirst",
                        widget: "checkbox",
                        defaultFirst: true,
                        changeFilter: false,
                        watch: [
                            "sexdefault",
                            (deps, options) => {
                                if (deps.sexdefault == 2) {
                                    delete this.enum;
                                    this.data = {
                                        "1": "大",
                                        "2": "小"
                                    };
                                } else {
                                    delete this.data;
                                    this.enum = "SEX";
                                }
                            }
                        ],
                        enum: "SEX"
                    },
                    {
                        label: "",
                        name: "job",
                        placeholder: "职业",
                        widget: "radio",
                        type: "button",
                        // defaultFirst: true,
                        changeFilter: true,
                        default() {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve("2");
                                }, 1000);
                            });
                        },
                        data: {
                            "1": "男1",
                            "2": "女2"
                        }
                    },
                    {
                        label: "",
                        name: "date",
                        placeholder: "日期区间",
                        widget: "date",
                        type: "daterange"
                    },
                    {
                        label: "",
                        name: "search",
                        widget: "search"
                    }
                ],
                format: model => {
                    model.attach = "abcd";
                },
                searchButton: {
                    label: "搜索",
                    icon: "ios-search",
                    color: "info"
                }
            }
        };
    }
};
</script>