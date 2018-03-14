import iView from 'iview';
import 'iview-style';
import './jquery-vendor';
import './vendor/ztree/jquery.ztree.all-3.5.min';
import './vendor/ztree/zTreeStyle/zTreeStyle.css';
import UEditorConfig from './vendor/ueditor/ueditor.config.js';
import UEditor from './vendor/ueditor/ueditor.sunset.js';
import echarts from 'echarts';

import video_js from 'video.js';
import 'video.js/dist/video-js.min.css';
window.videojs = video_js;


import Vue from 'vue';
import Router from 'vue-router';
import SunsetUI from './sunset-ui/index.js';

window.echarts = echarts;

Vue.use(Router);
Vue.use(iView);
Vue.use(SunsetUI);
SunsetUI.config({
	FORM_FIELD_LABEL_WIDTH: 100
})

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


SunsetUI.installDictionary([{
	type: 'SEX',
	key: '1',
	value: '男'
}, {
	type: 'SEX',
	key: '2',
	value: '女'
}, {
	type: 'ACCOUNT_TYPE',
	key: '1',
	value: '普通用户'
}, {
	type: 'ACCOUNT_TYPE',
	key: '2',
	value: '管理员'
}, {
	type: 'ACCOUNT_TYPE',
	key: '3',
	value: '超级管理员'
}]);

setTimeout(function () {
	//更新字典
	SunsetUI.installDictionary([{
		type: 'SEX',
		key: '1',
		value: '男'
	}, {
		type: 'SEX',
		key: '2',
		value: '女'
	}, {
		type: 'ACCOUNT_TYPE',
		key: '1',
		value: '普通用户111'
	}, {
		type: 'ACCOUNT_TYPE',
		key: '2',
		value: '管理员222'
	}, {
		type: 'ACCOUNT_TYPE',
		key: '3',
		value: '超级管理员333'
	}]);
}, 3000)

var router = new Router();
window.Router = router;

import App from './demo/App.vue';
import modules from './modules';

var routes = {};
modules.forEach(item => {
	item.path = `/${item.name}`;
	routes[item.path] = {
		component: item.component
	}
});
routes['/'] = {
	component: modules[0].component
}

router.map(routes);

router.start(App, 'app');import iView from 'iview';
import 'iview-style';
import './jquery-vendor';
import './vendor/ztree/jquery.ztree.all-3.5.min';
import './vendor/ztree/zTreeStyle/zTreeStyle.css';
import UEditorConfig from './vendor/ueditor/ueditor.config.js';
import UEditor from './vendor/ueditor/ueditor.sunset.js';
import echarts from 'echarts';

import video_js from 'video.js';
import 'video.js/dist/video-js.min.css';
window.videojs = video_js;


import Vue from 'vue';
import Router from 'vue-router';
import SunsetUI from './sunset-ui/index.js';

window.echarts = echarts;

Vue.use(Router);
Vue.use(iView);
Vue.use(SunsetUI);
SunsetUI.config({
	FORM_FIELD_LABEL_WIDTH: 100
})

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


SunsetUI.installDictionary([{
	type: 'SEX',
	key: '1',
	value: '男'
}, {
	type: 'SEX',
	key: '2',
	value: '女'
}, {
	type: 'ACCOUNT_TYPE',
	key: '1',
	value: '普通用户'
}, {
	type: 'ACCOUNT_TYPE',
	key: '2',
	value: '管理员'
}, {
	type: 'ACCOUNT_TYPE',
	key: '3',
	value: '超级管理员'
}]);

setTimeout(function () {
	//更新字典
	SunsetUI.installDictionary([{
		type: 'SEX',
		key: '1',
		value: '男'
	}, {
		type: 'SEX',
		key: '2',
		value: '女'
	}, {
		type: 'ACCOUNT_TYPE',
		key: '1',
		value: '普通用户111'
	}, {
		type: 'ACCOUNT_TYPE',
		key: '2',
		value: '管理员222'
	}, {
		type: 'ACCOUNT_TYPE',
		key: '3',
		value: '超级管理员333'
	}]);
}, 3000)

var router = new Router();
window.Router = router;

import App from './demo/App.vue';
import modules from './modules';

var routes = {};
modules.forEach(item => {
	item.path = `/${item.name}`;
	routes[item.path] = {
		component: item.component
	}
});
routes['/'] = {
	component: modules[0].component
}

router.map(routes);

router.start(App, 'app');