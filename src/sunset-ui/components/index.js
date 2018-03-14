// 工具栏
import Toolbar from "./toolbar/Toolbar.vue";
import Dropdown from "./toolbar/Dropdown";
import File from "./file/File.vue";

//过滤器
import Filter from "./filter/Filter.vue";

//表单
import Form from "./form/Form.vue";
import Input from "./input/Input.vue";
import Switch from "./switch/Switch.vue";
import SearchInput from "./searchInput/SearchInput.vue";

//富文本
import Editor from './editor/Editor';
import Coder from "./coder/Coder";

//数据分页
import Page from "./pager/Page.vue";
import Datapage from "./datapage/Datapage.vue";
import Table from "./table/Table.vue";

//树
import Tree from "./tree/Tree.vue";

//加载中
import Loading from "./loading/Loading";

//模态窗
import FormModal from "./modal/FormModal.vue";
import TableModal from "./modal/TableModal.vue";
import TreeModal from "./modal/TreeModal.vue";
import ViewModal from "./modal/ViewModal.vue";

//CRUD
import Crud from './crud/Crud.vue';

//超级视图
import Superview from './superview/Superview.vue';

//面包屑导航
import Breadcrumb from './breadcrumb/Breadcrumb';

// //图表
import Chart from './chart/Chart.vue';

//视频播放器
import Video from './video/Video.vue';

import './commonImageViewer/ImageViewer.vue';


module.exports = {
    // 工具栏
    Toolbar,
    File,
    Dropdown,
    //过滤器
    Filter,
    //表单
    Form,
    Input,
    Switch,
    SearchInput,
    //富文本
    Editor,
    Coder,
    //数据分页
    Page,
    Datapage,
    Table,
    //树
    Tree,
    //加载中
    Loading,
    //模态窗
    FormModal,
    TableModal,
    TreeModal,
    ViewModal,
    //CRUD
    Crud,
    //超级视图
    Superview,
    //视频播放器
    Video,
    //面包屑导航
    Breadcrumb
};
