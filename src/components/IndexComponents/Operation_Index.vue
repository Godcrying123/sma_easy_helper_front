<template>
    <div>
        <component v-on:operationToMenu="getMenuValue" :operationData="operationData" :is="OperationMenu"></component>
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
            operationData: [],
            subOperationData: [],
            menuCreateTemplate: ""
        }
    },
    methods: {
        operationInfoGet(){
            this.$axios.get('http://localhost:3000/operations').then((response)=>{
                this.operationData = response.data[0].DetailedSteps
                this.changeMenu()
            }).catch((function(error){
                console.log(error)
            }))
        },
        menuClick(name){
            this.subOperationData = this.operationData[name - 1]
            // this.emitToIndex()
        },
        getMenuValue(value) {
            this.subOperationData = value
        },
        emitToIndex(event){
            this.$emit('operationToIndex', this.subOperationData)
        },
        changeMenu() {
            var html = '<Menu theme="light" width="auto" @on-select="menuClick">'
            for (const key in this.operationData) {
                const element = this.operationData[key]
                html += '<MenuItem theme="light" name="'+ element.SubOperation_ID +'" >'+ element.SubOperation_Description +'</MenuItem>'
            }
            html += "</Menu>"
            this.menuCreateTemplate = html
        }
    },
    computed: {
        OperationMenu: function() {
            return {
                props: ['operationData'],
                data() {
                    return {
                        subOperationMenuData: []
                    }
                },
                methods: {
                    menuClick(name){
                        this.subOperationMenuData = this.operationData[name - 1]
                    },
                    emitToMenu(event) {
                        this.$emit('operationToMenu', this.subOperationMenuData)
                    }
                },
                watch: {
                    subOperationMenuData:function(){
                        this.emitToMenu()
                    }
                },
                template: `${this.menuCreateTemplate}`
            }
        }
    },
    watch: {
        subOperationData:function(){
            this.emitToIndex()
        }
    },
    mounted: function(){
        this.operationInfoGet()
    }
}
</script>