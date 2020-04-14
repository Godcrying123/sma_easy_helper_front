<template>
    <div>
        <div>
            <Row>
                <h3>Cluster Editor Panel</h3>
                <span>please edit the cluster information in this table based on the suggestions</span>
            </Row>
            <hr>
            <Row>
                <Table :columns="table_columns" :data="this.clusterDemo.Machines"></Table>
            </Row>
            <br>
            <Row>
                <Col span="6" offset="18" justify="end">
                    <Button >Back</Button>
                    <Button type="primary">Save</Button>
                    <Button >Export</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import expandRow from './Cluster_TableExpand'

export default {
    name: 'Content',
    components: {
        expandRow
    },
    data (){
        return {
            table_columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: 'Label',
                    key: 'Label'
                },
                {
                    title: 'HostName',
                    key: 'HostName'
                },
                {
                    title: 'HostIp',
                    key: 'HostIp'
                },
                {
                    title: '',
                    key: ''
                }
            ]
        }
    },
    props: ['clusterDemo'],
    methods: {
        clusterDemoShow(){
            console.log(this.clusterDemo)
        }
    },
    watch: {
        // clusterDemo: function(){
        //     console.log(this.clusterDemo)
        // }
    },
    mounted(){
        this.clusterDemoShow()
    }
}
</script>