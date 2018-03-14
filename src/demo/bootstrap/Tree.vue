<template>
    <div>
        <i-button type="info" @click="test">测试</i-button>
        <h1 class="wrapper-y-md">选择</h1>
        <div>
            <p>当前节点:{{selectedNode&&selectedNode.value}}</p>
            <p>父节点:{{selectedParentNode&&selectedParentNode.value}}</p>
        </div>
        <h1 class="wrapper-y-md">勾选</h1>
        <div>
            <p>
                <span v-for="c in checkeds">{{c.value}} | </span>
            </p>
        </div>
        <h2>Tree</h2>
        <div class="component-wrap">
            <sunset-tree ref="tree" :options="options.treeOptions" :nodes="options.treeNodes" @inited="inited" @selected="selected" @checked="checked"></sunset-tree>
        </div>
    </div>
</template>
<script>
    import BootstrapStore from './BootstrapStore';

    export default {
        methods: {
            test() {
                if (this.selectedNode) {
                    //新增
                    // this.$refs.tree.addNodes(this.selectedNode,{
                    //     key : 'xjd',
                    //     value : '新节点'   
                    // });
                    //修改
                    this.$refs.tree.updateNode({
                        key: '1',
                        value: '新节点'
                    });
                }
            },
            inited() {
                this.$refs.tree.refreshChecked('1,3,5,6,8,15,20');
            },
            selected(node, parentNode) {
                this.selectedNode = node;
                this.selectedParentNode = parentNode;
            },
            checked(checkeds) {
                this.checkeds = checkeds;
            }
        },
        data() {
            return {
                selectedNode: null,
                selectedParentNode: null,
                checkeds: null,
                formModalVisible: false,
                options: {
                    title: '管理账户',
                    store: BootstrapStore,
                    //树
                    treeOptions: {
                        autoExpand: false,
                        check: 'multi',
                        setting: {
                            data: {
                                key: {
                                    name: 'value',
                                    title: 'value'
                                },
                                simpleData: {
                                    enable: true,
                                    idKey: 'key',
                                    pIdKey: 'parent',
                                    rootPId: null
                                }
                            },
                            check: {
                                radioType: 'all'
                            },
                            format: {
                                nodeToValue(treeNode) {
                                    return treeNode && treeNode.data;
                                }
                            }
                        }
                    },
                    treeNodes: BootstrapStore.treeNodes()
                }
            }
        }
    };
</script>