<template>
    <div>
        <Menu width="auto" active-name="1" v-for="clusterEntity in clusterListData" :key="clusterEntity.Cluster_Id" @on-select='clusterClick'>
            <MenuItem theme="light" :name="clusterEntity.Name">{{ clusterEntity.Name }}</MenuItem>
        </Menu>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    name: 'List',
    data (){
        return {
            clusterSelect: null
        }
    },
    props: ["clusterListData"],
    methods: {
        clusterClick(name) {
            this.clusterSelect = name
        },
        emitToClusterIndex(event){
            // console.log(this.clusterSelect)
            this.$emit('clusterNameToIndex', this.clusterSelect)
        }
    },
    watch: {
        // clusterListDate: function(){
        //     console.log(this.clusterListDate)
        // },
        clusterSelect: function() {
            this.emitToClusterIndex()
        }
    },
    mounted(){
    }
}
</script>