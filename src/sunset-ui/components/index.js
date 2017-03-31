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

//富文本
import Editor from './editor/Editor';

//CRUD
import Crud from './crud/Crud.vue';

//面包屑导航
import Breadcrumb from './breadcrumb/Breadcrumb';

//图表
import Chart from './chart/Chart.vue';


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
    Editor: Editor,
    Loading: Loading,
    FormModal: FormModal,
    TableModal: TableModal,
    TreeModal: TreeModal,
    ViewModal: ViewModal,
    Breadcrumb: Breadcrumb,
    Crud : Crud,
    Chart : Chart
};