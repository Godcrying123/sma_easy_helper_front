<template>
    <div>
        <Layout>
            <Sider hidder-trigger :style="{background: '#fff'}">
                <ClusterList v-on:clusterNameToIndex="clusterNameGet" :clusterListData="clusterListData" ></ClusterList>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '380px', background: '#fff'}">
                    <ClusterContent :clusterDemo="clusterDemo" ></ClusterContent>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
import ClusterList from './List_Cluster'
import ClusterContent from './Content_Cluster'

export default {
    name: 'Cluster',
    components: {
        ClusterList,
        ClusterContent
    },
    data (){
        return {
            clusterInfoGetUrl: '',
            clusterSetDate: [],
            clusterListData: [],
            clusterName: null,
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
                }
                ]
            }
        }
    },
    methods: {
        clusterlistGet(){
            this.$axios.get('http://localhost:3000/clusters').then((response) => {
                this.clusterSetDate = response.data
                this.clusterList()
            }).catch((function (error){
                console.log(error)
            }))
        },
        clustercontentGet(){
            this.$axios.get('http://localhost:3000/clusters').then((response) => {
                this.clusterSetDate = response.data
                console.log(this.clusterSetDate)
            }).catch((function (error){
                console.log(error)
            }))
        },
        clusterList(){
            for (let index = 0; index < this.clusterSetDate.length; index++) {
                const element = this.clusterSetDate[index];
                this.clusterListData.push(element)
            }
        },
        clusterNameGet(value){
            this.clusterName = value
            // console.log(this.clusterSetDate)
            // console.log(this.clusterName)
            // this.clusterSetDate = this.clusterSetDate[this.clusterName]
        }
    },
    mounted(){
        this.clusterlistGet()
    }
}
</script>