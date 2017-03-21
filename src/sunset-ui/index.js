import iView from 'iview';
import 'iview-style';

const prefix = 'Sunset';

import FormWidgets from './components/widgets/widgets';

import Sunset from './common/sunset';
window.Sunset = Sunset;

//基础
import Filters from './common/filters';
import Directives from './common/directives';
import Validators from './common/validators';

//服务
Sunset.Service = require('./services/index');

//组件
Sunset.Components = require('./components/index');

import {
    Container,
    Sidebar,
    Header,
    Major,
    Layout
} from './layout';
const Layouts = {
    Container: Container,
    Header: Header,
    Sidebar: Sidebar,
    Major: Major,
    Layout: Layout
}



//请求组件
window.Base = {};
window.$http = function (...args) {

    var promise = $.Deferred();

    $.ajax.apply($, args).then((res) => {
        if (typeof res == 'object' && res.code) {
            if (res.code == 200) {
                promise.resolve(res.data);
            } else if (res.code == 401) {
                promise.reject(res);
            } else {
                Sunset.tip && Sunset.tip(res.message || '服务异常', 'warning')
            }
        }
        promise.reject(res);
    }, (err) => {
        console.log(err.message || err);
        promise.reject(err);
    });

    return promise;
}


var OuterVue = null,
    waitRegistList = [];

//安装VUE
exports.install = function install(Vue, options) {
    Vue.use(iView);
    //布局
    Object.keys(Layouts).forEach(c => {
        Vue.component(`${prefix}${c}`, Layouts[c]);
    });
    //组件
    var components = Sunset.Components;
    Object.keys(components).forEach(c => {
        Vue.component(`${prefix}${c}`, components[c]);
    });
    //扩展组件
    OuterVue = Vue;
    var extC;
    while (extC = waitRegistList.pop()) {
        Vue.component(extC.name, extC.widget);
    }
    //全局提示
    var tipType = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error',
        loading: 'loading'
    };
    Sunset.tip = function (message, type, duration) {
        return Vue.prototype.$Message[tipType[type] || 'info'](message, duration);
    };
    Sunset.notice = function (title, desc, type, duration) {
        return Vue.prototype.$Notice[tipType[type] || 'info']({
            title,
            desc,
            duration
        });
    };
    Sunset.confirm = function (option) {
        Vue.prototype.$Modal.confirm(option);
        return () => {
            Vue.prototype.$Modal.remove();
        }
    };
}

//注册外部表单组件
exports.registFormWidget = function (name, widget) {
    FormWidgets[`Widget${name}`] = widget;
}

//注册组件
exports.registComponent = function (name, widget) {
    if (OuterVue) {
        OuterVue.component(name, widget);
    } else {
        waitRegistList.push({
            name: name,
            widget: widget
        })
    }
}

//安装字典(type,key,value)
exports.installDictionary = function (dictionary) {
    // Promise.resolve().then(() => {
    //     return dictionary;
    // }).then(res => {
        Sunset.Service.Dictionary.install(dictionary || []);
    // });
}