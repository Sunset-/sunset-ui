import BootstrapStore from './BootstrapStore';

module.exports = {
    store: BootstrapStore,
    columns: [{
        title: '昵称',
        name: 'nickname'
    }, {
        title: '登录名',
        name: 'account'
    }, {
        title: '类型',
        name: 'type',
        enum: 'ACCOUNT_TYPE'
    }],
    showIndex: true,
    pageSize: 10,
    localPage: false,
    sortable: true,
    multiCheck: true,
    lazy : true,
    format: {
        list: 'rows',
        count: 'count',
        pageSize: 'pageSize',
        currentPage: 'pageNumber'
    },
    recordTools: {
        size: 'small',
        tools: [{
            label: '枚举',
            icon: 'ios-pricetags',
            color: 'info',
            operate: (record) => {
                this.$broadcast('DICTIONARY_ENUM_SHOW', record);
            },
            permission: 'Dictionary_ENUM'
        }, {
            label: '修改',
            icon: 'edit',
            color: 'warning',
            signal: 'MODIFY',
            permission: 'Dictionary_MODIFY'
        }, {
            label: '删除',
            icon: 'trash-a',
            color: 'error',
            signal: 'DELETE',
            permission: 'Dictionary_DELETE'
        }]
    }
};