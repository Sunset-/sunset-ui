<template>
	<validator name="validation">
		<div :class="['form-group']">
			<label class="control-label col-xs-3">{{options.label}}</label>
			<div class="input-group col-xs-7">
				<input type="text" class="form-control" readonly v-model="text" />
				<span class="input-group-btn">
					<button class="btn btn-white" @click="select" type="button">选择</button>
				</span>
			</div>
		</div>
	</validator>
	<modal-tree :options="options.tree" :title="options.label" :multi="multi"></modal-tree>
</template>

<script>

	// import ModalTree from './ModalTreeSelector';
	
	export default {
		components : {
			// ModalTree
		},
		props : {
			options : {
				type : Object
			},
			value : {
			}
		},
		data(){
			return {
				pending : false
			};
		},
		computed : {
			multi(){
				return !!this.options.multi;
			},
			idKey(){
				return this.options.idKey||'id';
			},
			nameKey(){
				return this.options.nameKey||'name';
			},
			text : {
				get(){
					return this.options.text||'';
				},
				set(v){
					this.options.text = v;
				}
			}
		},
		methods : {
			select(){
				this.$broadcast('MODEL_TREE_SELECTOR_SHOW')
			},
			refresh(newOptions){
				if(!newOptions){
					return;
				}
				//node替换
				if(newOptions.tree&&newOptions.tree.nodes){
					this.$broadcast('TREE_REFRESH_NODES',newOptions.tree.nodes);
				}
			}
		},
		events : {
			CRUD_TREE_SELECTOR_ENSURE(nodes){
				var val = null,
				text ='',
				idKey = this.idKey,
				nameKey = this.nameKey;
				if(nodes&&nodes.length){
					val =  nodes.map(item=>item[idKey]).join(',');
					text =  nodes.map(item=>item[nameKey]).join(',');
				}
				this.pending = true;
				this.value = val;
				this.text = text;
				this.pending = false;
			},
			SUNSET_WIDGET_REFRESH(name,options){
				if(name==this.options.name){
					this.refresh(options);
				}
				return true;
			},
			TREE_INITED(){
				this.$broadcast('TREE_REFRESH_CHECK',this.value);
			},
			WIDGET_RESET(){
				this.text = '';
			}
		},
		watch:{
			value(val){
				if(!this.pending){
					this.$broadcast('TREE_REFRESH_CHECK',this.value);
				}
			}
		}
	};

</script>