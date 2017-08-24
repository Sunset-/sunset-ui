const prefix = 'Sunset';

import FormWidgets from './components/widgets/widgets';

import Sunset from './common/sunset';
window.Sunset = Sunset;

//基础
import Filters from './common/filters';
import Directives from './common/directives';
import Validators from './common/validators';
import ConfigService from './common/config';

//服务
Sunset.Service = require('./services/index');

//组件
Sunset.Components = require('./components/index');

//布局
const Layouts = require('./layout/index');

//弹窗查看视频
import './components/modal/VideoModal.vue';

var OuterVue = null,
    waitRegistList = [];

//安装
exports.install = function install(Vue, options) {
    //基础
    Filters(Vue);
    Directives(Vue);
    Validators(Vue);
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
    require('./common/prompt')(Sunset, Vue);
}

//全局配置
exports.config = ConfigService.config;
Sunset.getConfig = ConfigService.getConfig;

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
    Sunset.Service.Dictionary.install(dictionary || []);
}