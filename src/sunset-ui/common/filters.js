import Vue from 'vue';

/**
 * 业务NFS文件路径转换
 */
// Vue.filter('uploadImage',function(value){
// 	return Base.commonImagePrefix(value);
// });

/**
 * 时间格式化
 */
Vue.filter('time', function (value, format) {
	format = format || 'yyyy-MM-dd HH:mm:ss'
	return Sunset.Dates.format(parseInt(value), format);
});

/**
 * 枚举转码
 */
Vue.filter('enum', function (value, enumType) {
	return Base.ENUM_MAP[enumType] && Base.ENUM_MAP[enumType][value] || value;
});