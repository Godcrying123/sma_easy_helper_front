<template>
    <div>
        <div>
            <Row>
                <h3>Cluster Editor Panel</h3>
                <span>please edit the cluster information in this table based on the suggestions</span>
            </Row>
        </div>
        <hr>
        <div>
            <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">UserName: </span>
                <span class="expand-value">{{ row.username }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">AuthType: </span>
                <span class="expand-value">{{ row.authtype }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Password: </span>
                <span class="expand-value">{{ row.password }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Label: </span>
                <span class="expand-value">{{ row.label }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">AuthKey: </span>
                <span class="expand-value">{{ row.authkey }}</span>
            </Col>
            </Row>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    name: 'Content',
    data (){
        return {
        }
    },
    props: {
        
    },
    methods: {
        // clusterDemoShow(){
        //     console.log(clusterDemo)
        // }
    },
    watch: {
        clusterDemo: function(){
            console.log(this.clusterDemo)
        }
    },
    mounted(){
        // this.clusterDemoShow()
    }
}
</script>