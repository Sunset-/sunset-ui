import Vue from 'vue';

//权限
Vue.directive('permission', {
	update: function (newValue, oldValue) {
		// if (newValue && !(Base && Base.permissions[newValue])) {
		// 	this.el.remove();
		// }
	}
});

// 默认图片
var DEFAULT_IMG = {
	DEFAULT: '/assets/img/nopic.png',
	DICOM: '/assets/img/dicom-nopic.png',
	AVATAR: '/assets/img/default-doctorhead.png'
};
Vue.directive('default-img', {
	update: function (newValue, oldValue) {
		var defaultImage = DEFAULT_IMG[this.expression] || DEFAULT_IMG.DEFAULT;
		this.el.onerror = () => {
			this.el.src = defaultImage;
		}
	}
});

// var echarts = require('echarts');
// Vue.directive('echarts', {
//     deep: true,
//     params: ['loading'],
//     paramWatchers: {
//         loading: function (val, oldVal) {
//             var _this = this;

//             if (val === true) {
//                 _this.instance.showLoading();
//             } else {
//                 _this.instance.hideLoading();
//             }
//         }
//     },
//     bind: function () {
//         var _this = this;

//         Vue.nextTick(function () {
//             // init echarts instance
//             _this.instance = echarts.init(_this.el);

//             // show loading animation
//             if (_this.params.loading === true) {
//                 _this.instance.showLoading();
//             }

//             // auto resize
//             var resizeEvent = new Event('resize');

//             _this.resizeEventHandler = function () {
//                 _this.instance.resize();
//             };

//             _this.el.addEventListener('resize', _this.resizeEventHandler, false);

//             window.onresize = function () {
//                 _this.el.dispatchEvent(resizeEvent);
//             };
//         });
//     },
//     update: function (val, oldVal) {
//         var _this = this;
//         var options = val;

//         Vue.nextTick(function () {
//             _this.instance.setOption(options);
//         });
//     },
//     unbind: function () {
//         var _this = this;

//         _this.instance.dispose();

//         _this.el.removeEventListener('resize', _this.resizeEventHandler, false);
//     }
// });