<!--
参数：
options : {
	showIndex : true,//是否显示序号
	multiCheck: false,//是否多选
	pageSize : 10,//分页大小
	localPage : false,//是否本地分页
	sortable : false,//排序(本地分页时有用)
	idKey : 'id',//条目id属性名
	columns : [{
		title : '类型',//列头
		name : 'type',//数据项属性名
		enum : 'sex'//枚举类型,
		format : function/DATETIEM/DATE //格式化
	}],
	format:{//分页参数名称转换
		list : 'list',//数据集合
		count  : 'count',//数据总数
		pageSize : 'pageSize',//分页大小
		currentPage : 'currentPage'//当前分页页码
	},
	filter : 见SearchForm组件,
	recordTools:见recordTools组件
}
store : 存储

事件:
CRUD_TABLE_REFRESH() 刷新当前分页
CRUD_OPERATE_SEARCH(filter) 查询
-->
<style lang="sass">
	.sunset-crud-table-container {
		.sunset-crud-table-wrap {
			overflow-y: auto;
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			.text-center {
				text-align: center;
			}
			table {
				width: 100%;
				max-width: 100%;
				border-color: #eee;
				margin-top: -1px;
				background-color: transparent;
				border-collapse: collapse;
				border-spacing: 0;
				thead {
					display: table-header-group;
					vertical-align: middle;
					border-color: inherit;
				}
				tr {
					display: table-row;
					vertical-align: inherit;
					border-color: inherit;
					th {
						border-top: 0;
						border-color: #eee;
						position: relative;
						border: 1px solid #eee;
						border-bottom: 1px solid #eee;
						color: #2c2e2f;
						padding: 12px 15px;
						vertical-align: bottom;
					}
					td {
						border-color: #eee;
						border-top: 0;
						border-bottom: 1px solid #eee;
						padding: 12px 15px;
						border: 1px solid #eee;
						line-height: 1.42857143;
						vertical-align: middle;
					}
				}
				tbody {
					tr:nth-child(odd)>td,
					tr:nth-child(odd)>th {
						background-color: #f9f9f9;
					}
				}
			}
			.table>thead>tr>td,
			.table>tbody>tr>td,
			.table>tfood>tr>td,
			.table>thead>tr>th,
			.table>tbody>tr>th,
			.table>tfood>tr>th {
				padding: 10px 15px;
			}
			.table>tbody>tr>td.sunset-table-record-tools {
				position: relative;
				padding: 0px;
				text-align: center;
				&>div {
					position: absolute;
					top: 0px;
					bottom: 0px;
					width: 100%;
					&>div {
						display: table;
						height: 100%;
						width: 100%;
						&>.sunset-toolbar {
							display: table-cell;
							vertical-align: middle;
						}
					}
				}
			}
		}
		.sunset-crud-table-toolbar-wrap {
			padding-bottom: 15px;
			.sunset-toolbar {
				.btn {
					margin-bottom: 0px;
				}
			}
			&:after {
				content: '';
				display: block;
				clear: both;
			}
		}
		.sunset-crud-table-footer {
			margin-top: 15px;
		}
	}
</style>
<template>
	<div class="sunset-crud-table-container">
		<!--过滤器-->
		<div v-if="options.filter||options.toolbar" class="sunset-crud-table-toolbar-wrap">
			<sunset-toolbar v-if="options.toolbar" :options="options.toolbar" @signal="operateRecord"></sunset-toolbar>
			<search-form v-if="options.filter" v-ref:filter :options="options.filter" @filter="search"></search-form>
		</div>
		<!--表格主体-->
		<div class="table-wrap sunset-crud-table-wrap" :style="{maxHeight:domTableHeight}">
			<sunset-loading :loading.sync="loading" top="40">
				<table :class="['table table-bordered table-striped',options.condensed?'table-condensed':'']">
					<thead>
						<tr>
							<th v-if="options.multiCheck" class="text-center" style="width:60px;">
								<input type="checkbox" :checked="isAllCheck" @change="checkAll" />
							</th>
							<th v-if="options.showIndex" class="text-center" style="width:60px;">序号</th>
							<th v-for="col in columns" :style="col.style||{}">
								<div @click="sort(col)" style="cursor:pointer;">
									{{col.title}}
									<i v-if="sortable" :class="['fa',sortCol!=col.name?'fa-sort text-stable':(sortOrder=='ASC'?'fa-sort-asc':'fa-sort-desc')]"></i>
								</div>
							</th>
							<th v-if="recordTools.length" class="text-center" :style="{width:(recordToolsWidth+'px')}">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list">
							<th v-if="options.multiCheck" class="text-center">
								<input type="checkbox" :value="item[idKey]" v-model="checkedIds" @change="checkItem(item,$event)" />
							</th>
							<td v-if="options.showIndex" class="text-center">{{(pageNumber-1)*pageSize+ $index+1}}</td>
							<td v-for="col in columns" :style="col.style||{}">{{{getColValue(item,col.name) | sunset_transcode col item}}}</td>
							<td class="sunset-table-record-tools" v-if="recordTools.length" class="text-center">
								<div>
									<div>
										<sunset-toolbar :options="recordTools" :ctx="item" @signal="operateRecord"></sunset-toolbar>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</table>
			</sunset-loading>
		</div>
		<!--分页-->
		<div v-show="totalPage" class="sunset-crud-table-footer">
			<sunset-page @change="refresh" right="true" :page-number.sync="pageNumber" :show-total="true" :page-size="pageSize" :total.sync="count"></sunset-page>
		</div>
	</div>
</template>
<script>
	import SunsetPage from '../pager/Page.vue';
	import SearchForm from './SearchForm';

	import Vue from 'vue';

	Vue.filter('sunset_transcode', function (value, col, record) {
		if (col.enum) {
			return Base && Base.ENUM_MAP[col.enum] && Base.ENUM_MAP[col.enum][value] || value;
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

	export default {
		components: {
			SearchForm,
			SunsetPage
		},
		props: {
			options: {
				type: Object
			},
			checkeds: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				pageNumber_: 1,
				filter: {},
				localFilter: null,
				data: null,
				localCount: 0,
				isAllCheck: false,
				domTableHeight: 'auto',
				sortCol: null,
				sortOrder: 'DESC',
				loading: false,
				recordTools: []
			}
		},
		computed: {
			store() {
				return this.options.store;
			},
			isLocalPage() {
				return !!this.options.localPage;
			},
			columns() {
				return this.options.columns || [];
			},
			recordToolsWidth() {
				if (this.options.recordToolsWidth) {
					return this.options.recordToolsWidth;
				} else {
					var w = 0;
					this.recordTools.forEach(t => {
						w += t.label.length * 14 + (t.icon ? 20 : 0) + 25;
					});
					w += 30;
					return w;
				}
			},
			format() {
				return this.options.format || {};
			},
			pageNumber: {
				set(val) {
					this.refrechCheckAll();
					this.pageNumber_ = val;
				},
				get() {
					return this.pageNumber_;
				}
			},
			pageSize() {
				return this.options.pageSize || 10;
			},
			multiCheck() {
				return !!this.options.multiCheck;
			},
			idKey() {
				return this.options.idKey || 'id';
			},
			list() {
				this.sortData();
				var list;
				if (this.format && this.format['list'] == '') {
					list = this.data || [];
				} else {
					list = this.data && Sunset.getAttribute(this.data, this.format['list'] || 'list', []);
				}
				if (this.isLocalPage) {
					//本地分页
					var start = (this.pageNumber - 1) * this.pageSize,
						localFilter = this.localFilter;
					list = localFilter && list.filter(localFilter) || list || [];
					this.localCount = list.length;
					return list.slice(start, start + this.pageSize);
				} else {
					return list;
				}
			},
			count() {
				if (!this.isLocalPage) {
					return this.data && Sunset.getAttribute(this.data, this.format['count'] || 'count', 0);
				} else {
					//本地分页
					return this.localCount;
				}
			},
			totalPage() {
				return this.count > this.pageSize;
			},
			datasource() {
				return this.options.datasource;
			},
			checkedIds() {
				return this.checkeds.map(item => item[this.idKey]);
			},
			formatFilter() {
				return this.options.formatFilter;
			},
			sortable() {
				return !!this.options.sortable;
			}
		},
		methods: {
			getColValue(item, name) {
				return Sunset.getAttribute(item, name, '');
			},
			setRecordTools(tools) {
				return this.recordTools = tools || [];
			},
			resetFilter(filter) {
				if (this.$refs.filter) {
					this.$refs.filter.reset(filter);
				} else {
					this.refresh(1, true);
				}
			},
			search(filter, localFilter, force) {
				this.filter = Object.assign(this.filter, filter || {});
				this.localFilter = localFilter;
				this.refresh(1, force);
			},
			refresh(pageNumber, force) {
				pageNumber = pageNumber == void 0 ? this.pageNumber : pageNumber;
				this.pageNumber = pageNumber;
				var filter = $.extend(true, {}, this.filter);
				if (!this.isLocalPage) {
					if (!this.store) {
						throw new Error('table remote datasorce need store !');
					}
					//后端分页
					filter[this.format['currentPage'] || 'currentPage'] = (this.options.pageNumberStart === 0) ? pageNumber - 1 :
						pageNumber;
					filter[this.format['pageSize'] || 'pageSize'] = this.pageSize;
					filter = this.formatFilter && this.formatFilter(filter) || filter;
					this.loading = true;
					this.store[this.options.method || 'list'](filter).then(res => {
						this.data = res;
						this.refrechCheckAll();
						this.loading = false;
					});
				} else {
					//本地分页
					if (force || !this.data) {
						var datasource = this.datasource;
						if (datasource) {
							if (Sunset.isArray(datasource) || Sunset.isObject(datasource)) {
								this.data = datasource;
							} else if (Sunset.isFunction(datasource)) {
								var res = datasource();
								if (res.then) {
									this.loading = true;
									res.then(data => {
										this.data = Sunset.isArray(data) ? data.slice(0) : Object.assign({}, data);
										this.loading = false;
									});
								} else {
									this.data = Sunset.isArray(res) ? res.slice(0) : Object.assign({}, res);
								}
							}
						} else {
							filter = this.formatFilter && this.formatFilter(filter) || filter;
							this.loading = true;
							this.store[this.options.method || 'list'](filter).then(res => {
								this.data = res;
								this.loading = false;
							});
						}
					}
				}
			},
			setData(data) {
				this.data = data;
			},
			checkItem(item, ev) {
				this.checkRecord(item, ev.currentTarget.checked);
			},
			checkAll(ev) {
				var isToCheck = ev.currentTarget.checked;
				this.list.forEach(item => {
					this.checkRecord(item, isToCheck);
				});
				this.isAllCheck = isToCheck;
			},
			checkRecord(item, isToCheck) {
				var idKey = this.idKey,
					id = item[idKey];
				if (isToCheck) {
					if (this.checkeds.findIndex(temp => temp[idKey] == id) < 0) {
						this.checkeds.push(item);
					}
				} else {
					var index;
					if ((index = this.checkeds.findIndex(temp => temp[idKey] == id)) >= 0) {
						this.checkeds.splice(index, 1);
					}
				}
			},
			refrechCheckAll() {
				if (this.options.multiCheck) {
					this.isAllCheck = false;
				}
			},
			initStyle() {
				var contentHeight = $('.sunset-layout-content', this.el).height();
				this.domTableHeight = contentHeight - 170 + 'px';
			},
			sort(col) {
				var sortCol = this.sortCol,
					sortOrder = this.sortOrder;
				if (col.name == sortCol) {
					sortOrder = sortOrder == 'ASC' ? 'DESC' : 'ASC';
				} else {
					sortCol = col.name;
					sortOrder = 'ASC';
				}
				this.sortCol = sortCol;
				this.sortOrder = sortOrder;
				this.sortData();
			},
			sortData() {
				if (!this.sortable || !this.sortCol) {
					return;
				}
				var sortCol = this.sortCol,
					sortOrder = this.sortOrder,
					list;
				if (this.format && this.format['list'] == '') {
					list = this.data || [];
				} else {
					list = this.data && Sunset.getAttribute(this.data, this.format['list'] || 'list', []);
				}
				if (sortOrder == 'ASC') {
					list && list.sort((o1, o2) => {
						return o1[sortCol] < o2[sortCol] ? -1 : (o1[sortCol] > o2[sortCol] ? 1 : 0);
					});
				} else {
					list && list.sort((o1, o2) => {
						return o1[sortCol] > o2[sortCol] ? -1 : (o1[sortCol] < o2[sortCol] ? 1 : 0);
					});
				}
			},
			operateRecord(signal, record) {
				switch (signal) {
					case 'DELETE':
						this.deleteRecord(record);
						break;
					default:
						this.$emit.apply(this, ['signal'].concat([].slice.call(arguments)));
				}
			},
			deleteRecord(record) {
				var store = this.options.store;
				var clear = store && Sunset.confirm({
					content: '确定删除此条目',
					loading: true,
					onOk: () => {
						store[this.options.deleteMethod || 'removeById'](record[this.idKey || 'id']).then(res => {
							clear();
							Sunset.tip('删除成功', 'success');
							if (this.pageNumber > 1 && (this.count - 1 == (this.pageNumber - 1) * this.pageSize)) {
								this.refresh(this.pageNumber - 1, true);
							} else {
								this.refresh(void 0, true);
							}
						});
					}
				});
			},
			getCheckeds() {
				return this.checkeds;
			}
		},
		events: {
			CRUD_TABLE_REFRESH(force) {
				this.refresh(this.pageNumber, force);
			},
			CRUD_TABLE_CLEAR() {
				this.data = null;
				this.localCount = 0;
			},
			CRUD_TABLE_SETDATA(data, table) {
				if (!table || table == this.options.name) {
					this.data = data;
				}
			},
			CRUD_OPERATE_SEARCH(filter, localFilter, force) {
				this.search(filter, localFilter, force);
			}
		},
		ready() {
			if (!this.options.lazy) {
				this.refresh(1);
			}
			this.initStyle();
			this.setRecordTools(this.options.recordTools);
		}
	}
</script>