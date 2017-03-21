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
		afterList(data){
			data&&data.rows&&data.rows.forEach(item=>{
				delete item.password;
			})
			return data;
		}
	}

	treeNodes(){
		return Promise.resolve().then(()=>{
			var map = Base.ENUMS,
				nodes = [];
			Object.keys(map).forEach(type=>{
				nodes.push({
					key : type,
					value : type
				});
				map[type].forEach(item=>{
					item.parent = type;
					nodes.push(item);
				})
			})
			return nodes;
		});
	}
}

export default new BootstrapStore();