<template>
    <div>
        <Menu width="auto" active-name="1" v-for="operationEntity in operationListData" :key="operationEntity.ID" @on-select='operationClick'>
            <MenuItem theme="light" :name="operationEntity.ID" >{{ operationEntity.Description }}</MenuItem>
        </Menu>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    name: 'List',
    props:['operationListData'],
    data (){
        return {
            operationSelect: null
        }
    },
    methods: {
        operationClick(name){
            this.operationSelect = name
        },
        emitToOperationIndex(event){
            this.$emit('operationNameToIndex', this.operationSelect)
        }
    },
    watch: {
        operationSelect: function(){
            this.emitToOperationIndex()
        }
    },
    mounted(){
    }
}
</script>