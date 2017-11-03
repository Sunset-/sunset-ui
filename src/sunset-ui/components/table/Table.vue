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

-->
<style lang="sass">
	.sunset-crud-table-container {
		.sunset-crud-table-wrap {
			overflow-y: visible;
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
						padding: 8px 8px;
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
				padding: 8px;
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
		<!--表格主体-->
		<div class="table-wrap sunset-crud-table-wrap">
			<sunset-loading :style="widthStyle" :loading.sync="loading" top="40">
				<table :class="['table table-bordered table-striped',options.condensed?'table-condensed':'']">
					<thead>
						<tr class="noselect">
							<th v-if="options.multiCheck" class="text-center" style="width:60px;">
								<input type="checkbox" :checked="isAllCheck" @change="checkAll($event.currentTarget.checked)" />
							</th>
							<th v-if="options.showIndex" class="text-center" style="width:60px;">{{options.indexTitle||'序号'}}</th>
							<th v-for="col in showColumns">
								<div @click="sort(col)" style="cursor:pointer;">
									{{col.title}}
									<i v-if="sortable&&col.sortable!==false" :class="['fa',sortCol!=col.name?'fa-sort text-stable':(sortOrder=='ASC'?'fa-sort-asc':'fa-sort-desc')]"></i>
								</div>
							</th>
							<th v-if="recordTools" class="text-center" :style="options.recordToolsStyle||{width:(recordToolsWidth+'px')}">{{options.recordToolsTitle||'操作'}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list">
							<td v-if="options.multiCheck" class="text-center">
								<input type="checkbox" v-if="canCheck(item.self)" :value="item.self[idKey]" :checked="computedCheck(item.self)" @change="checkRecord(item.self,$event.currentTarget.checked)"
								/>
							</td>
							<td v-if="options.showIndex" class="text-center">{{(pageNumber-1)*pageSize+ $index+1}}</td>
							<td v-for="col in showColumns" :style="col.style||{'text-align':col.align}">{{{ item.__sunset_col_texts[col.__sunset_col_index]}}}</td>
							<td v-if="recordTools" class="sunset-table-record-tools" class="text-center">
								<div>
									<div>
										<sunset-toolbar :options="recordTools" :ctx="item.self" @signal="operateRecord"></sunset-toolbar>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</table>
			</sunset-loading>
			<div v-show="!loading&&(!count||count===0)">
				<slot name="empty"></slot>
			</div>
		</div>
		<!--分页-->
		<div v-show="showPager" class="sunset-crud-table-footer">
			<sunset-page @change="refresh" right="true" :page-number.sync="pageNumber" :show-total="true" :page-size="pageSize" :total.sync="count"></sunset-page>
		</div>
	</div>
</template>
<script>
	export default {
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
				sortCol: null,
				sortOrder: 'DESC',
				loading: false
			}
		},
		computed: {
			widthStyle() {
				if (this.options.minWidth) {
					return {
						'min-width': `${this.options.minWidth}px`
					}
				}
			},
			//是否本地分页
			isLocalPage() {
				return !!this.options.localPage;
			},
			//列
			columns() {
				return (this.options.columns || []).map((col, index) => {
					col.__sunset_col_index = index;
					return col;
				});
			},
			showColumns() {
				return this.columns.filter(col => !!col.name && (col.premise ? col.premise() : true));
			},
			//行操作栏
			recordTools() {
				var result = false;
				var recordTools = this.options.recordTools;
				if (recordTools) {
					if (Sunset.isArray(recordTools) && recordTools.length) {
						result = {
							size: Sunset.getConfig('TABLE_TOOLBAR_SIZE'),
							tools: recordTools
						};
					} else if (Sunset.isArray(recordTools.tools) && recordTools.tools.length) {
						result = recordTools;
						if (recordTools.size == void 0) {
							recordTools.size = Sunset.getConfig('TABLE_TOOLBAR_SIZE');
						}
					}
				}
				return result;
			},
			recordToolsWidth() {
				if (this.options.recordToolsWidth) {
					return this.options.recordToolsWidth;
				} else {
					var w = 0,
						recordTools = this.recordTools;
					if (recordTools) {
						var tools = Sunset.isArray(recordTools) ? recordTools : recordTools.tools,
							space = recordTools.size == 'small' ? 26 : 38;
						tools.forEach(t => {
							w += (t.label && t.label.length || 0) * 14 + (t.icon ? 20 : 0) + space;
						});
					}
					return Math.max(w, 60);
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
			//数据
			formatFilter() {
				return this.options.formatFilter;
			},
			store() {
				return this.options.store;
			},
			datasource() {
				return this.options.datasource;
			},
			list() {
				this.sortData();
				var list;
				if (this.format && this.format['list'] == '') {
					list = this.data || [];
				} else {
					list = this.data && Sunset.getAttribute(this.data, this.format['list'] || 'list', []) || [];
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
			showPager() {
				return this.count > this.pageSize;
			},
			//勾选
			idKey() {
				return this.options.idKey || 'id';
			},
			multiCheck() {
				return !!this.options.multiCheck;
			},
			checkedIds() {
				return this.checkeds.map(item => item[this.idKey]);
			},
			//排序
			sortable() {
				return !!this.options.sortable;
			},
			slientLoading() {
				return this.options.loading === false;
			}
		},
		methods: {
			search(filter, localFilter, force) {
				this.filter = filter || {};
				this.localFilter = localFilter;
				this.refresh(1, true);
			},
			refresh(pageNumber, force) {
				pageNumber = pageNumber == void 0 ? this.pageNumber : pageNumber;
				this.pageNumber = pageNumber;
				//过滤条件
				var filter = $.extend(true, {}, this.filter);
				var currentPagePlace = this.format['currentPage'] || 'currentPage';
				var pageStart = this.options.pageNumberStart === 0?0:1;
				filter[currentPagePlace] = (this.options.pageNumberStart === 0) ? pageNumber - 1 :
					pageNumber;
				filter[this.format['pageSize'] || 'pageSize'] = this.pageSize;
				filter = this.formatFilter && this.formatFilter(filter) || filter;
				if (force || !this.isLocalPage || !this.data) {
					//服务器分页
					var datasource = this.datasource || this.store && this.store[this.options.method || 'list'].bind(this.store);
					Promise.resolve((() => {
						if (datasource) {
							this.refreshLoader(true);
							return Sunset.isFunction(datasource) ? datasource(filter) : datasource;
						} else {
							throw new Error('table load data need datasource or store');
						}
					})()).then(res => {
						//判断是否回退到前一页
						var list = res && Sunset.getAttribute(res, this.format['list'] || 'list', [])||[];
						var count = res && Sunset.getAttribute(res, this.format['count'] || 'count', 0)||0;
						if(list.length==0&&count>0&&filter[currentPagePlace]>pageStart){
							filter[currentPagePlace] = filter[currentPagePlace]-1;
							return Sunset.isFunction(datasource) ? datasource(filter) : datasource;
						}else{
							return res;
						}
					}).then(res=>{
							this.refreshLoader(false);
							this.setData(res);
					}).catch(e => {
						console.error(e);
						this.$emit('load-error', e);
						this.refreshLoader(false);
					});
				}

			},
			refreshLoader(flag) {
				if (!this.slientLoading) {
					this.loading = flag;
				}
			},
			setData(res) {
				if (!this.$el) {
					return;
				}
				var columns = this.columns,
					list;
				if (this.format && this.format['list'] == '') {
					list = res || [];
				} else {
					list = res && Sunset.getAttribute(res, this.format['list'] || 'list', []);
				}
				list = list.map(record => {
					var copy = {};
					var __sunset_col_texts = {};
					columns.forEach((col, index) => {
						__sunset_col_texts[index] = Sunset.Service.Common.tableColTranscode(Sunset.getAttribute(record, col.name,
							''), col, record)
					});
					copy.__sunset_col_texts = __sunset_col_texts;
					copy.self = record;
					return copy;
				});
				if (this.format && this.format['list'] == '') {
					res = list;
				} else {
					res && Sunset.setAttribute(res, this.format['list'] || 'list', list);
				}
				this.data = res;
				this.refrechCheckAll();
			},
			refreshAfterRemove() {
				if (this.pageNumber > 1 && (this.count - 1 == (this.pageNumber - 1) * this.pageSize)) {
					this.refresh(this.pageNumber - 1, true);
				} else {
					this.refresh(void 0, true);
				}
			},
			//设置行操作栏
			setRecordTools(tools) {
				return this.recordTools = tools || [];
			},
			//勾选
			canCheck(item) {
				if (Sunset.isFunction(this.options.multiCheck)) {
					return !!this.options.multiCheck(item);
				} else {
					return true;
				}
			},
			checkAll(isToCheck) {
				this.list.forEach(item => {
					this.checkRecord(item.self, isToCheck);
				});
				this.isAllCheck = isToCheck;
			},
			checkRecord(item, isToCheck) {
				if (!this.canCheck(item)) {
					return;
				}
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
					if (this.checkeds.length == 0) {
						this.isAllCheck = false;
					}
				}
			},
			computedCheck(item) {
				var idKey = this.idKey,
					id = item[idKey];
				return (this.checkeds.findIndex(temp => temp[idKey] == id)) >= 0;
			},
			refrechCheckAll() {
				if (this.options.multiCheck) {
					this.isAllCheck = false;
				}
			},
			getCheckeds() {
				return this.checkeds;
			},
			//排序
			sort(col) {
				if (col.sortable === false) {
					return;
				}
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
				this.sortData(col.__sunset_col_index);
			},
			sortData(colIndex) {
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
				var v1, v2;
				if (sortOrder == 'ASC') {
					list && list.sort((o1, o2) => {
						v1 = o1.__sunset_col_texts[colIndex]; //  Sunset.getAttribute(o1, sortCol);
						v2 = o2.__sunset_col_texts[colIndex]; //Sunset.getAttribute(o2, sortCol);
						return v1 < v2 ? -1 : (v1 > v2 ? 1 : 0);
					});
				} else {
					list && list.sort((o1, o2) => {
						v1 = o1.__sunset_col_texts[colIndex]; //  Sunset.getAttribute(o1, sortCol);
						v2 = o2.__sunset_col_texts[colIndex]; //Sunset.getAttribute(o2, sortCol);
						return v1 > v2 ? -1 : (v1 < v2 ? 1 : 0);
					});
				}
			},
			operateRecord(signal, record) {
				this.$emit.apply(this, ['signal'].concat([].slice.call(arguments)));
			},
			getRecords() {
				return this.list && this.list.map(item => item.self) || [];
			}
		},
		ready() {
			if (!this.options.lazy) {
				this.refresh(1);
			}
		}
	}
</script>