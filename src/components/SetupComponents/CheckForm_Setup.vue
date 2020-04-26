<template>
    <div id='checkform'>
        <Card :bordered="false">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                Check Form
            </p>
            <p>Please confirm your selected cluster and operations, and you can review your choice in the below content.</p>
            <br/>
            <p>
                this is your selected cluster information: {{ clusterData.Name }}
            </p>
            <p>
                <Table :columns="columns3" :data="clusterData.Machines"></Table>
            </p>
            <p>
                this is your selected operation information
            </p>
            <p>
              <List :header="operationData.OperationShortName"  border>
                <div v-for="operationEntity in operationData.DetailedSteps" :key="operationEntity.SubOperationID">
                  <ListItem>{{ operationEntity.SubOperationID }}.{{ operationEntity.SubOperationDescription }}</ListItem>
                </div>
              </List>
            </p>
        </Card>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import {clusterSelectByName, operationSelectByName} from "../../apis/api";

export default {
    name: 'checkform',
    props:['ClusterSelectedValue','OperationSelectedValue'],
    data (){
        return {
            confirmDisplay:false,
            columns3: [
                {
                    title: 'Label',
                    key: 'Label',
                    fixed: 'left'
                },
                {
                    title: 'HostName',
                    key: 'HostName',
                },
                {
                    title: 'HostIP',
                    key: 'HostIP',
                },
                {
                    title: 'UserName',
                    key: 'UserName',
                },
                {
                    title: 'AuthType',
                    key: 'AuthType',
                },
                {
                    title: 'PassWord',
                    key: 'PassWord',
                },
                {
                    title: 'AuthKey',
                    key: 'AuthKey',
                }],
                clusterData: {},
                operationData: {}
        }
    },
    methods: {
        emitToContent(event){
            this.$emit('checkFormToContent', this.confirmDisplay)
        },
        clusterEntityGet(ClusterSelectedValue){
          clusterSelectByName(ClusterSelectedValue).then(response => {
            // console.log(response.data)
            this.clusterData= response.data
          }).catch(error => {
            console.log(error)
          })
        },
        operationEntityGet(OperationSelectedValue){
          operationSelectByName(OperationSelectedValue).then(response => {
            // console.log((response.data))
            this.operationData = response.data
          }).catch(error => {
            console.log(error)
          })
        }
    },
    watch: {
        confirmDisplay: function(){
            this.emitToContent()
        }
    },
    mounted: function(){
        if (this.ClusterSelectedValue != null){
          this.clusterEntityGet(this.ClusterSelectedValue)
        }
        if (this.OperationSelectedValue != null)  {
          this.operationEntityGet(this.OperationSelectedValue)
        }
        if (this.ClusterSelectedValue != null && this.OperationSelectedValue != null){
          this.confirmDisplay = true
        }
    }
}
</script>
