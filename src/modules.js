import Toolbar from './demo/bootstrap/Toolbar.vue';
import Filter from './demo/bootstrap/Filter.vue';
import Form from './demo/bootstrap/Form.vue';
import Datapage from './demo/bootstrap/Datapage';
import Table from './demo/bootstrap/Table';
import Tree from './demo/bootstrap/Tree.vue';
import Modal from './demo/bootstrap/Modal.vue';
import Crud from './demo/bootstrap/Crud.vue';
import SuperView from './demo/bootstrap/SuperView.vue';
import SerializeForm from './demo/bootstrap/SerializeForm.vue';


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
}, {
    name: 'SuperView',
    title: '超级视图',
    component: SuperView
}, {
    name: 'SerializeForm',
    title: '表单序列化',
    component: SerializeForm
}];


module.exports = modules;