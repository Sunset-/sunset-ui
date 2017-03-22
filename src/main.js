import './jquery-vendor';
import './vendor/ztree/jquery.ztree.all-3.5.min';
import './vendor/ztree/zTreeStyle/zTreeStyle.css';

import Vue from 'vue';
import Router from 'vue-router';
import SunsetUI from './sunset-ui/index';

Vue.use(Router);
Vue.use(SunsetUI);

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