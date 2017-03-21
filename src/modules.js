import Toolbar from './demo/bootstrap/Toolbar.vue';
import Filter from './demo/bootstrap/Filter.vue';
// import Crud from './demo/bootstrap/Crud.vue';
// import Modal from './demo/bootstrap/Modal.vue';
// import Tree from './demo/bootstrap/Tree.vue';
// import View from './demo/bootstrap/View.vue';


let modules = [{
        name: 'Toolbar',
        title: '工具栏',
        component: Toolbar
    }, {
        name: 'Filter',
        title: '搜索过滤',
        component: Filter
    }
    // , {
    //     name: 'Crud',
    //     title: '增删改查',
    //     component: Crud
    // }, {
    //     name: 'Modal',
    //     title: '模态窗',
    //     component: Modal
    // }, {
    //     name: 'Tree',
    //     title: '树',
    //     component: Tree
    // }, {
    //     name: 'View',
    //     title: '视图',
    //     component: View
    // }
];


module.exports = modules;