<template>
    <div>
        <Layout>
            <Sider theme="light" hidder-trigger :style="{backgroud: '#f5f7f9'}">
                <ClusterList v-on:clusterNameToIndex="clusterNameGet"  :clusterListDate="clusterListDate" ></ClusterList>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '380px', background: '#fff'}">
                    <ClusterContent :clusterSetDate="clusterSetDate" ></ClusterContent>
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
            clusterListDate: [],
            clusterName: null
        }
    },
    methods: {
        clusterlistGet(){
            this.$axios.get('http://localhost:3000/clusters').then((response) => {
                this.clusterSetDate = response.data
                // console.log(this.clusterSetDate)
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
                this.clusterListDate.push(element)
            }
            // console.log(this.clusterListDate)
        },
        clusterNameGet(value){
            this.clusterName = value
            console.log(this.clusterName)
            // this.clusterSetDate = this.clusterSetDate[this.clusterName]
        }
    },
    mounted(){
        this.clusterlistGet()
    }
}
</script>