<style lang="sass">
    .sunset-view-modal {
        &.hide-footer {
            .ivu-modal-footer {
                display: none;
            }
        }
    }
</style>
<template>
    <Modal :class-name="'sunset-view-modal ' +(options.toolbar===false?'hide-footer':'')" :visible.sync="visible" :title="options.title"
        :width="options.width||700" @on-cancel="afterCancel">
        <slot></slot>
        <div slot="footer">
            <sunset-toolbar v-if="customerTools" :options="options.toolbar"></sunset-toolbar>
            <i-button v-if="!customerTools" type="success" @click="cancel">{{options.okText||'确定'}}</i-button>
        </div>
    </Modal>
</template>
<script>
    export default {
        components: {},
        props: {
            visible: {},
            options: {}
        },
        data() {
            return {
                modal_loading: false
            }
        },
        computed: {
            customerTools() {
                return Sunset.isArray(this.options.toolbar);
            }
        },
        methods: {
            open() {
                this.visible = true;
            },
            cancel() {
                this.visible = false;
                this.modal_loading = false;
                this.options.cancel && this.options.cancel();
            },
			afterCancel(){
				this.$emit('cancel');
			}
        }
    };
</script>