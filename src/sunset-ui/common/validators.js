	import VueValidator from 'vue-validator';

	module.exports = function (Vue) {
		Vue.use(VueValidator);

		//邮箱
		Vue.validator('email', {
			message: '邮箱格式不合法',
			check: function (val) {
				return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
			}
		});

		//手机号
		Vue.validator('phone', {
			message: '手机号码格式不合法',
			check: function (val) {
				return (val.trim() == '') || /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|70)\d{8}$/.test(val);
			}
		});

		//密码
		Vue.validator('password', {
			message: '密码为6-24位字母数字组合',
			check: function (val) {
				return /^\w{6,24}$/.test(val);
			}
		});

		//整数
		Vue.validator('integer', {
			message: '请输入整数',
			check: function (val) {
				return /^-?\d+$/.test(val);
			}
		});
	}