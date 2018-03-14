<template>
	<validator name="validation">
		<div :class="['form-group',invalid?'has-error':'']">
			<label class="control-label col-xs-1">{{options.label}}</label>
			<div class="input-group col-xs-11" style="width:86.11111111111111%;">
				<table class="table table-bordered table-striped table-condensed">
					<thead>
						<tr>
							<th class="text-center" style="width:60px;">序号</th>
							<th class="text-center" v-for="col in options.cols">{{col.title}}</th>
							<th class="text-center">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="record in records">
							<td class="text-center">{{$index+1}}</td>
							<th class="text-center" v-for="col in options.cols">
								<input type="text" v-model="record[col.name]" @change="inputChange" :placeholder="col.placeholder||''" />
							</th>
							<td class="text-center">
								<button class="btn btn-xs btn-danger" @click="removeRecord(item)"><i class="glyphicon glyphicon-remove m-r-xs"></i>删除</button>
							</td>
						</tr>
						<tr>
							<td class="text-center" :colspan="options.cols.length+2">
								<button class="btn btn-success" type="button" @click="addRecord">添加</button>
							</td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</table>
				<input :type="type" style="display:none;" class="form-control" :placeholder="options.placeholder" :maxlength="maxlength"
								field="field" v-model="value" v-validate="options.validate" />
				<i v-show="invalid" class="glyphicon glyphicon-exclamation-sign text-danger sunset-pop" :data-content="invalidMsg"></i>
			</div>
		</div>
	</validator>
</template>
<script>
	
	export default {
		props : {
			options : {
				type : Object
			},
			value : {
			}
		},
		data(){
			return {
				records : []
			};
		},
		computed : {
			type(){
				return this.options.type=='input'?'text':this.options.type;
			},
			maxlength(){
				return this.options.maxlength||this.options.validate&&this.options.validate.maxlength&&this.options.validate.maxlength.rule;
			},
			invalid(){
				return this.options.validate&&this.$validation.field.invalid;
			},
			invalidMsg(){
				return this.options.validate&&this.$validation.field.errors&&this.$validation.field.errors.length&&this.$validation.field.errors[0].message;
			}
		},
		methods : {
			addRecord(){
				this.records.push({});
			},
			removeRecord(item){
				this.records.splice(this.records.indexOf(item),1);
			},
			inputChange(){
				this.value = this.records;
			}
		},
		mounted{
			this.records = this.value ||[];
		},
		events:{
			WIDGET_REFRESH_VALUE(){
				this.records = this.value ||[];
			}
		}
	};

</script>