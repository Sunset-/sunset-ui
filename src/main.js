import './jquery-vendor';

import Vue from 'vue';
import Router from 'vue-router';
import SunsetUI from './sunset-ui/index';

Vue.use(Router);
Vue.use(SunsetUI);

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