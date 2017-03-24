import Toolbar from './demo/bootstrap/Toolbar.vue';
import Filter from './demo/bootstrap/Filter.vue';
import Form from './demo/bootstrap/Form.vue';
import Datapage from './demo/bootstrap/Datapage';
import Table from './demo/bootstrap/Table';
import Tree from './demo/bootstrap/Tree.vue';
import Modal from './demo/bootstrap/Modal.vue';
import Crud from './demo/bootstrap/Crud.vue';


let modules = [{
    name: 'Toolbar',
    title: '工具栏',
    component: Toolbar
}, {
    name: 'Filter',
    title: '搜索过滤',
    component: Filter
}, {
    name: 'Form',
    title: '表单组件',
    component: Form
}, {
    name: 'Datapage',
    title: '数据分页',
    component: Datapage
}, {
    name: 'Table',
    title: '表格',
    component: Table
}, {
    name: 'Tree',
    title: '树',
    component: Tree
}, {
    name: 'Modal',
    title: '模态窗',
    component: Modal
}, {
    name: 'Crud',
    title: '增删改查',
    component: Crud
}];


module.exports = modules;