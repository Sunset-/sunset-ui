import './commonImageViewer/ImageViewer.vue';

// 工具啦
import Dropdown from './toolbar/Dropdown';
import File from './file/File.vue';
import Toolbar from './toolbar/Toolbar.vue';

//过滤器
import Filter from './filter/Filter.vue';

// 表单
import Form from './form/Form.vue';

//数据分页
import Page from './pager/Page.vue';
import Datapage from './datapage/Datapage.vue';
import Table from './table/Table.vue';

//树
import Tree from './tree/Tree.vue';

//加载中
import Loading from './loading/Loading';

//模态窗
import FormModal from './modal/FormModal.vue';
import TableModal from './modal/TableModal.vue';
import TreeModal from './modal/TreeModal.vue';
import ViewModal from './modal/ViewModal.vue';

// import Breadcrumb from './components/breadcrumb/Breadcrumb';
// import Crud from './components/crud/Crud.vue';
// import Editor from './components/editor/Editor';


module.exports = {
    Dropdown: Dropdown,
    File: File,
    Toolbar: Toolbar,
    Filter: Filter,
    Form: Form,
    Page: Page,
    Datapage: Datapage,
    Table: Table,
    Tree: Tree,
    Loading: Loading,
    FormModal: FormModal,
    TableModal: TableModal,
    TreeModal: TreeModal,
    ViewModal: ViewModal
};