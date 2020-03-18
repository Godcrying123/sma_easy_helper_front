<template>
    <div>
        <div>
            <Row>
                <h3>Cluster:</h3>
                <span>please select the cluster and then go to next step, and you can click each one to review its details.</span>
            </Row>
            <br/>
            <Row>
                <RadioGroup>
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
export default {
    name: 'cluster',
    data (){
        return {
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
                            }, 'View'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, 'Edit')
                        ]);
                    }
                }],
            clusterDate:[],
        }
    },
    methods: {
        clusterInfoGet(){
            this.$axios.get('http://localhost:3000/clusters').then((response) => {
                this.clusterDate = response.data
            }).catch((function (error){
                console.log(error)
            }))
            }
    },
    beforeMount: function(){
        this.clusterInfoGet()
    }
}
</script>