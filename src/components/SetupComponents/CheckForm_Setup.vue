<template>
    <div id='checkform'>
        <Card :bordered="false">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                Check Form
            </p>
            <p>Please confirm your selected cluster and operations, and you can review your choice in the below content.</p>
            <p>
                <br/>
                this is your selected cluster information
            </p>
            <p>
                <Table :columns="columns3" :data="clusterDemo.Machines"></Table>
            </p>
            <p>
                <br/>
                this is your selected operation information
            </p>
            <p>
            </p>
        </Card>
    </div>
</template>

<script>
/* eslint-disable */
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
                    title: 'HostIp',
                    key: 'HostIp',
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
                    title: 'Password',
                    key: 'Password',
                },
                {
                    title: 'AuthKey',
                    key: 'AuthKey',
                }],

                clusterDemo: {
                "Cluster_Id": 1,
                "Name": "cluster-01",
                "NumofMachine": 3,
                "Label": "develop",
                "Machines": [
                {
                    "Id": 1,
                    "HostName": "test-cluster-01",
                    "HostIp": "192.0.0.1",
                    "UserName": "Jackson",
                    "AuthType": "password",
                    "Password": "123456",
                    "AuthKey": "/test/script.crt",
                    "Label": "master"
                },
                {
                    "Id": 2,
                    "HostName": "test-cluster-02",
                    "HostIp": "192.0.0.1",
                    "UserName": "Jackson",
                    "AuthType": "password",
                    "Password": "123456",
                    "AuthKey": "/test/script.crt",
                    "Label": "worker"
                },
                {
                    "Id": 3,
                    "HostName": "test-cluster-03",
                    "HostIp": "192.0.0.1",
                    "UserName": "Jackson",
                    "AuthType": "password",
                    "Password": "123456",
                    "AuthKey": "/test/script.crt",
                    "Label": "NFS-server"
                }]
            }
        }
    },
    methods: {
        emitToContent(event){
            this.$emit('checkFormToContent', this.confirmDisplay)
        },
        clusterEntityGet(){
        },
        operationEntityGet(){
        }
    },
    watch: {
        confirmDisplay: function(){
            this.emitToContent()
        }
    },
    mounted: function(){
        if (this.ClusterSelectedValue != null && this.OperationSelectedValue != null)  {
            this.clusterEntityGet()
            this.operationEntityGet()
            this.confirmDisplay = true
        }
    }
}
</script>