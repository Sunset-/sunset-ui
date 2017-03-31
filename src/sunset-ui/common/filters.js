module.exports = function (Vue) {
	/**
	 * 取值
	 */
	Vue.filter('sunset_namespace', function (obj, namespace) {
		return Sunset.getAttribute(obj, namespace, '');
	});

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
		return Sunset.Service.Dictionary.transcode(enumType, value);
	});

	/**
	 * 转码
	 */
	Vue.filter('sunset_transcode', Sunset.Service.Common.tableColTranscode);
}