
export default class Store {

	constructor(ops) {
		if (ops) {
			var options = ops || {};
			this.URLS = options.URLS || {};
			this.METHODS = options.METHODS || {};
			this.callbacks = options.callbacks || {};
		}
	}

	/**
	 * 分页查询
	 * @param  {[type]} filter [description]
	 * @return {[type]}        [description]
	 */
	list(filter) {
		return $http(this._triggerEvent('beforeList', {
			url: this._getURL('LIST'),
			type: this._getMethod('LIST', 'GET'),
			data: filter
		})).then(res => {
			return this._triggerEvent('afterList', res);
		});
	}

	/**
	 * 覆盖保存
	 * @param  {[type]} model [description]
	 * @return {[type]}       [description]
	 */
	save(model) {
		return $http(this._triggerEvent('beforeSave', {
			url: this._getURL('SAVE'),
			type: this._getMethod('SAVE', model.id ? 'PUT' : 'POST'),
			data: model
		})).then(res => {
			this._triggerEvent('dataDirty', model);
			return this._triggerEvent('afterSave', res);
		});
	}

	/**
	 * 根据ID获取条目
	 * @return {[type]} [description]
	 */
	getById(id) {
		return $http(this._triggerEvent('beforeGetById', {
			url: this._getURL('GET_BY_ID').replace(/\{id\}/, id),
			type: this._getMethod('GET_BY_ID', 'GET')
		})).then(res => {
			return this._triggerEvent('afterGetById', res);
		});
	}

	/**
	 * 根据ID删除条目
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	removeById(id) {
		return $http(this._triggerEvent('beforeDelete', {
			url: this._getURL('DELETE').replace(/\{id\}/, id),
			type: this._getMethod('DELETE', 'DELETE'),
			data: {
				id
			}
		})).then(res => {
			this._triggerEvent('dataDirty');
			return this._triggerEvent('afterDelete', res);
		});
	}

	_getURL(which) {
		var url;
		if (url = this.URLS[which]) {
			return url;
		} else {
			throw new Error(`未配置URL : ${which}`);
		}
	}

	_getMethod(which, defaultMethod) {
		var method;
		if (this.METHODS && (method = this.METHODS[which])) {
			return method;
		} else {
			return defaultMethod;
		}
	}

	_triggerEvent(event, ...args) {
		var callback;
		if (this.callbacks && (callback = this.callbacks[event])) {
			return callback.apply(this, args);
		}
		return args && (args.length == 1 ? args[0] : args);
	}
}