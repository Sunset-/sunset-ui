<style lang="sass">
	@import '../../style/index.scss';
	.sunset-crud-container {
		background: #FFF;
		padding: 20px;
		.sunset-crud-breadcrumb {
			border-bottom: 1px solid $border;
			padding-bottom: 5px;
			margin-bottom: 20px;
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
	import SunsetBreadcrumb from '../breadcrumb/Breadcrumb.vue';
	import SunsetTable from './Table';
	import SunsetForm from './Form';
	import Store from './Store';

	export default {
		components: {
			SunsetBreadcrumb,
			SunsetTable,
			SunsetForm
		},
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
				PAGE_DETAIL: '',
				store: (this.options.store instanceof Store ? this.options.store : new Store(this.options.store))
			}
		},
		computed: {},
		methods: {
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