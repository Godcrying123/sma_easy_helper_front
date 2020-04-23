<template>
    <div>
        <div>
            <Button :size="buttonSize" @click="backStep">Go Back</Button>
            <Button type="primary" :size="buttonSize" @click="nextStep" >Next Step</Button>
            <Button type="success" :size="buttonSize" v-if="confirmdisplay" @click="confirmStep">Confirm</Button>
        </div>
        <br>
        <div>
            <Info :contentId='contentId' v-if='info'></Info>
            <Cluster v-on:clusterToContent="getCluster" :ClusterSelectedValue="ClusterSelectedValue" v-if='cluster'></Cluster>
            <Operation v-on:operationToContent="getOperation" :OperationSelectedValue="OperationSelectedValue" v-if='operation'></Operation>
            <CheckForm v-on:checkFormToContent="getChildValue" :contentId='contentId' v-if='checkform' :ClusterSelectedValue="ClusterSelectedValue" :OperationSelectedValue="OperationSelectedValue"></CheckForm>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
import Info from './Info_Setup'
import Cluster from './Cluster_Setup'
import Operation from './Operation_Setup'
import CheckForm from './CheckForm_Setup'
import {clusterSelectByName, initClusterDataWrite, initOperationDataWrite, operationSelectByName} from "../../apis/api";

export default {
    name: 'Content_Setup',
    components: {
        Info,
        Cluster,
        Operation,
        CheckForm
    },
    props:['cateId','contentId', "currentMenu"],
    data (){
        return {
            info: true,
            cluster: false,
            operation: false,
            checkform: false,
            buttonSize: 'large',
            confirmdisplay: true,
            subCateID: 0,
            subContentId: 0,
            nextMenu: "",
            ClusterSelectedValue: null,
            OperationSelectedValue: null,
            clusterData:{},
            operationData:{}

        }
    },
    methods: {
        getChildValue(value){
            this.confirmdisplay = value
        },
        getCluster(value){
            this.ClusterSelectedValue = value
        },
        getOperation(value){
            this.OperationSelectedValue = value
        },
        backStep(){
            if (this.subCateID == "4") {
                this.nextMenu = "3-1"
            } else if (this.subCateID == "3") {
                this.nextMenu = "2-1"
            } else if (this.subCateID == "2") {
                this.nextMenu = "1-4"
            } else {
                if (this.subContentId == "1") {
                    this.nextMenu = "1-1"
                } else {
                    this.nextMenu = "1" + "-" + (parseInt(this.subContentId) - 1)
                }
            }
            this.emitNextMenuToIndex()
        },
        nextStep(){
            if (this.subCateID == "4") {
                this.nextMenu = "4-1"
            } else if (this.subCateID == "3") {
                this.nextMenu = "4-1"
            } else if (this.subCateID == "2") {
                this.nextMenu = "3-1"
            } else {
                if (this.subContentId == "4") {
                    this.nextMenu = "2-1"
                } else {
                    this.nextMenu = "1" + "-" + (parseInt(this.subContentId) + 1)
                }
            }
            this.emitNextMenuToIndex()
            // console.log(this.nextMenu)
        },
        confirmStep(){
            if (this.ClusterSelectedValue != null && this.OperationSelectedValue != null) {
                this.clusterEntityGet(this.ClusterSelectedValue)
                this.operationEntityGet(this.OperationSelectedValue)
            }
            this.$router.push({
                    path: '/action?cluster='+ this.ClusterSelectedValue +'&operation='+ this.OperationSelectedValue
                })
        },
        emitNextMenuToIndex(){
            // this.currentMenu = this.nextMenu
            this.$emit("nextMenuToIndex", this.nextMenu)
        },
        initClusterWrite(clusterData){
          initClusterDataWrite(clusterData).then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        },
        initOperationWrite(operationData){
          initOperationDataWrite(operationData).then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        },
        clusterEntityGet(ClusterSelectedValue){
          clusterSelectByName(ClusterSelectedValue).then(response => {
            console.log(response.data)
            this.clusterData= response.data
            this.initClusterWrite(this.clusterData)
          }).catch(error => {
            console.log(error)
          })
        },
        operationEntityGet(OperationSelectedValue){
          operationSelectByName(OperationSelectedValue).then(response => {
            console.log((response.data))
            this.operationData = response.data
            this.initOperationWrite(this.operationData)
          }).catch(error => {
            console.log(error)
          })
        }
    },
    watch: {
        cateId: function(){
            if (this.cateId === '1'){
                this.info = true,
                this.cluster = false,
                this.operation = false,
                this.checkform = false
            } else if (this.cateId === '2'){
                this.info = false,
                this.cluster = true,
                this.operation = false,
                this.checkform = false
            } else if (this.cateId === '3'){
                this.info = false,
                this.cluster = false,
                this.operation = true,
                this.checkform = false
            } else if (this.cateId === '4'){
                this.info = false,
                this.cluster = false,
                this.operation = false,
                this.checkform = true
            }
        },
        nextMenu: function() {
            this.subCateID = this.currentMenu.split('-')[0]
            this.subContentId = this.currentMenu.split('-')[1]
        },
        currentMenu: function() {
            this.nextMenu = this.currentMenu
        }
    },
    mounted: function(){
        this.getChildValue()
        this.subCateID = this.currentMenu.split('-')[0]
        this.subContentId = this.currentMenu.split('-')[1]
    }
}
</script>
