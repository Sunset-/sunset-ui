class BootstrapStore extends Sunset.Service.Store {

	constructor() {
		super();
	}

	URLS = {
		LIST: '/service/manage/account',
		SAVE: '/service/manage/account',
		DELETE: '/service/manage/account/{id}',
	}

	callbacks = {
		afterList(data) {
			data && data.rows && data.rows.forEach(item => {
				delete item.password;
			})
			return data;
		}
	}

	list() {
		return Promise.resolve({
			rows: [{
				account: 'admin',
				nickname: '超级管理员',
				type: '1',
				id: '1',
				show: true
			}, {
				account: 'user_1',
				nickname: '普通用户A',
				id: '2',
				type: '2',
				show: true
			}, {
				account: 'admin_2',
				nickname: '普通用户B',
				id: '3',
				type: '2'
			}, {
				account: 'admin_3',
				nickname: '普通用户C',
				id: '4',
				type: '2'
			}, {
				account: 'admin_4',
				nickname: '普通用户D',
				id: '5',
				type: '2'
			}],
			count: 5
		})
	}

	treeNodes() {
		return Promise.resolve().then(() => {
			var map = Sunset.Service.Dictionary.getAllEnums(),
				nodes = [];
			Object.keys(map).forEach(type => {
				nodes.push({
					key: type,
					value: type
				});
				map[type].forEach(item => {
					item.parent = type;
					nodes.push(item);
				})
			})
			return nodes;
		});
	}
}

export default new BootstrapStore();