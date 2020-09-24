<template>
    <div>
        <div>
            <Row>
                <h3>Cluster:</h3>
                <span>please select the cluster and then go to next step, and you can click each one to review its details.</span>
            </Row>
            <br/>
            <Row>
                <RadioGroup v-model="clusterSelected">
                    <Radio v-for="clusterEntity in clusterDate" :key="clusterEntity.Cluster_Id" :label="clusterEntity.Name" border></Radio>
                </RadioGroup>
            </Row>
            <br/>
            <Row>
                <Collapse simple accordion>
                    <Panel v-for="clusterEntity in clusterDate" :key="clusterEntity.Cluster_Id">
                        {{ clusterEntity.Name }}
                        <p slot="content">
                            <Table :columns="columns2" :data="clusterEntity.Machines"></Table>
                        </p>
                    </Panel>
                </Collapse>
            </Row>
        </div>
        <div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import {clusterList} from "../../apis/api";


export default {
    name: 'cluster',
    props: ['ClusterSelectedValue'],
    data (){
        return {
            clusterSelected: null,
            columns2: [
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
                },

                {
                    title: 'Action',
                    key: 'action',
                    fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, 'View')
                        ]);
                    }
                }],
            clusterDate:[]
        }
    },
    methods: {
        clusterInfoGet(){
          clusterList().then(response => {
              // console.log(response.data)
              this.clusterDate = response.data
          }).catch(error => {
            console.log(error);
          })
        },
        emitToContent(event){
            this.$emit('clusterToContent', this.clusterSelected)
        }
    },
    watch: {
        clusterSelected: function(){
            this.emitToContent()
        }
    },
    mounted: function(){
        this.clusterInfoGet()
        this.clusterSelected = this.ClusterSelectedValue
    }
}
</script>
