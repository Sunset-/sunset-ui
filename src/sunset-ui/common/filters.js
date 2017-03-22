import Vue from 'vue';

/**
 * 业务NFS文件路径转换
 */
// Vue.filter('uploadImage',function(value){
// 	return Base.commonImagePrefix(value);
// });

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
Vue.filter('sunset_transcode', function (value, col, record) {
	if (col.enum) {
		return Sunset.Service.Dictionary.transcode(col.enum, value);
	} else if (col.format) {
		if (Sunset.isFunction(col.format)) {
			return col.format(value, record);
		} else {
			switch (col.format) {
				case 'DATETIME':
					return Sunset.Dates.format(new Date(value));
					break;
				case 'DATE':
					return Sunset.Dates.format(new Date(value), 'yyyy-MM-dd');
					break;
			}
		}
	}
	return value;
});