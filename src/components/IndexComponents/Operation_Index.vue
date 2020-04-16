<template>
    <div>
        <Menu width="auto" active-name="1" v-for="operationEntity in operation_data" :key="operationEntity.SubOperation_ID" @on-select='menuClick'>
            <MenuItem :name="operationEntity.SubOperation_ID">{{ operationEntity.SubOperation_Description}}</MenuItem>
        </Menu>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    name: 'Operation',
    data (){
        return {
            operation_data: [],
            sub_operation_data: []
        }
    },
    methods: {
        operationInfoGet(){
            this.$axios.get('http://localhost:3000/operations').then((response)=>{
                this.operation_data = response.data[0].DetailedSteps
                // console.log(this.operation_data)
            }).catch((function(error){
                console.log(error)
            }))
        },
        menuClick(name){
            this.sub_operation_data = this.operation_data[name - 1]
        },
        emitToIndex(event){
            this.$emit('operationToIndex', this.sub_operation_data)
        }
    },
    watch: {
        sub_operation_data:function(){
            this.emitToIndex()
        }
    },
    mounted: function(){
        this.operationInfoGet()
    }
}
</script>