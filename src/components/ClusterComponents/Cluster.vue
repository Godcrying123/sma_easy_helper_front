<template>
    <div>
        <Layout>
            <Sider hidder-trigger :style="{background: '#fff'}">
                <ClusterList :clusterListData="clusterListData" v-on:clusterNameToIndex="clusterNameGet" ></ClusterList>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '1000px', background: '#fff'}">
                    <ClusterContent :clusterDemo="clusterData" ></ClusterContent>
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

import  {clusterList, clusterSelectByName} from '../../apis/api'

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
            clusterData: {}
        }
    },
    methods: {
        clusterlistGet(){
            clusterList().then(response => {
                this.clusterSetDate = response.data
                console.log(this.clusterSetDate)
                this.clusterList()
            }).catch(error => {
                console.log(error)
            })
        },
        clustercontentGet(){
          clusterSelectByName(this.clusterName).then(response => {
              this.clusterData = response.data
          }).catch(error => {
              console.log(error)
          })
        },
        clusterList(){
            for (let index = 0; index < this.clusterSetDate.length; index++) {
                const element = this.clusterSetDate[index];
                this.clusterListData.push(element)
            }
            console.log(this.clusterListData)
        },
        clusterNameGet(value){
            this.clusterName = value
            this.clustercontentGet()
            // console.log(this.clusterSetDate)
            // console.log(this.clusterName)
            // this.clusterSetDate = this.clusterSetDate[this.clusterName]
        }
    },
    created(){
        this.clusterlistGet()
    }
}
</script>
