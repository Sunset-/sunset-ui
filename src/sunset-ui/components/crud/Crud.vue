<style lang="sass">
	@import '../../style/index.scss';
	.sunset-crud-container {
		background: #FFF;
		padding: 20px;
		.sunset-crud-breadcrumb {
			border-bottom: 1px solid $border;
			padding-bottom: 5px;
			margin-bottom: 15px;
		}
		.crud-toolbar-filter-wrap {
			margin-bottom: 15px;
		}
	}
</style>
<!-- 数据表布局（标准增删改查） -->
<template>
	<div class="sunset-crud-container">
		<div v-show="options.title!==false" class="sunset-crud-breadcrumb">
			<sunset-breadcrumb v-ref:breadcrumb :options="pathOptions" @route="routePath"></sunset-breadcrumb>
		</div>
		<!-- 数据表格 -->
		<div v-show="PAGE=='CRUD_TABLE'">
			<div v-if="filterOptions||toolbarOptions" class="crud-toolbar-filter-wrap">
				<sunset-toolbar :options="toolbarOptions" @signal="operateSignal"></sunset-toolbar>
				<sunset-filter :options="filterOptions" @filter="filterData"></sunset-filter>
			</div>
			<sunset-table v-ref:table :options="options.tableOptions" @signal="operateSignal"></sunset-table>
		</div>
		<!-- 编辑表单 -->
		<div v-show="PAGE=='CRUD_FORM'">
			<div class="panel-body">
				<sunset-form v-ref:form :options="options.formOptions" @signal="operateSignal"></sunset-form>
			</div>
		</div>
		<!-- 查看页面 -->
		<div v-show="PAGE=='CRUD_VIEW'">
			<div class="panel-body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object
			}
		},
		data() {
			return {
				PAGE: 'CRUD_TABLE',
				pathOptions: {
					paths: []
				},
				PAGE_DETAIL: ''
			}
		},
		computed: {
			toolbarOptions() {
				return this.options.toolbarOptions || this.options.tableOptions.toolbar;
			},
			filterOptions() {
				return this.options.filterOptions || this.options.tableOptions.filter;
			},
			store() {
				return this.options.store;
			}
		},
		methods: {
			filterData() {
				this.$refs.table.search.apply(this.$refs.table, [].slice.call(arguments));
			},
			operateSignal(signal, record) {
				switch (signal) {
					case 'SAVED':
						this.$refs.table.refresh(void 0, true);
						this.PAGE = 'CRUD_TABLE';
						this.$refs.breadcrumb.pop();
						break;
					case 'ADD':
						this.$refs.form.reset({});
						this.PAGE = 'CRUD_FORM';
						this.PAGE_DETAIL = '新增';
						this.$refs.breadcrumb.append({
							title: '新增'
						});
						break;
					case 'MODIFY':
						this.$refs.form.reset(Object.assign({}, record));
						this.PAGE = 'CRUD_FORM';
						this.PAGE_DETAIL = '编辑';
						this.$refs.breadcrumb.append({
							title: '编辑'
						});
						break;
					case 'DELETE':
						this.deleteRecord(record);
						break;
					case 'VIEW':
						this.PAGE = 'CRUD_VIEW';
						this.PAGE_DETAIL = '查看';
						this.$refs.breadcrumb.append({
							title: '查看'
						});
						break;
					case 'CANCEL':
						this.PAGE = 'CRUD_TABLE';
						this.$refs.breadcrumb.pop();
						break;
					case 'REFRESH':
						this.$refs.table.refresh(void 0, true);
						break;
					case 'RESET':
						this.$refs.table.refresh(1, true);
						break;
					case 'FILTER':
						this.$refs.table.resetFilter(record);
						break;
				}
				this.$emit('signal', signal, record);
			},
			routePath(path) {
				if (path.key == 'HOME') {
					this.PAGE = 'CRUD_TABLE';
				}
			},
			getTableCheckeds() {
				return this.$refs.table.getCheckeds();
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
							this.$refs.table.refreshAfterRemove();
						});
					}
				});
			}
		},
		ready() {
			this.$refs.breadcrumb.append({
				key: 'HOME',
				title: this.options.title + '列表'
			});
		}
	};
</script>