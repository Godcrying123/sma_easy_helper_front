<template>
    <div>
        <component v-on:operationToMenu="getMenuValue" :operationData="operationData" :is="OperationMenu"></component>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import {initOperationRead} from "../../apis/api";

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
            initOperationRead().then(response => {
                // console.log(response.data)
                this.operationData = response.data.DetailedSteps
                this.changeMenu()
            }).catch(error => {
                console.log(error)
            })
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
            let html = '<Menu theme="light" width="auto" @on-select="menuClick">';
            for (const key in this.operationData) {
                const element = this.operationData[key]
                html += '<MenuItem theme="light" name="'+ element.SubOperationID +'" >'+ element.SubOperationDescription +'</MenuItem>'
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
