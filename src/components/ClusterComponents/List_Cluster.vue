<template>
    <div>
        <Menu width="auto" :active-name="clusterEntity.Name" v-for="clusterEntity in clusterListData" :key="clusterEntity.Cluster_Id" @on-select='clusterClick'>
            <MenuItem theme="light" :name="clusterEntity.Name" >{{ clusterEntity.Name }}</MenuItem>
            <MenuItem theme="light" :name="clusterEntity.Name" >{{ clusterEntity.Name }}</MenuItem>
        </Menu>
        <!-- <component :is="ClusterMenu"></component> -->
        <!-- <Menu theme="light" width="auto" @on-select="clusterClick"><MenuItem theme="light" name="cluster-01" >cluster-01</MenuItem><MenuItem theme="light" name="cluster-02" >cluster-02</MenuItem></Menu> -->
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
            clusterSelect: null,
            menuCreateTemplate: ""
        }
    },
    props: ["clusterListData"],
    methods: {
        clusterClick(name) {
            console.log(name)
            this.clusterSelect = name
        },
        emitToClusterIndex(event){
            // console.log(this.clusterSelect)
            this.$emit('clusterNameToIndex', this.clusterSelect)
        },
        changeMenu() {
            var html = '<Menu theme="light" width="auto" @on-select="contentSwitch">'
            console.log(Object.keys(this.clusterListData).length)
            for (const key in this.clusterListData) {
                const element = this.clusterListData[key]
                html += '<MenuItem theme="light" name="'+ element.Name +'" >'+ element.Name +'</MenuItem>'
            }
            html += "</Menu>"
            console.log(html)
            this.menuCreateTemplate = html
        }

    },
    computed: {
        ClusterMenu: function() {
            template: `${this.menuCreateTemplate}`
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
        this.changeMenu()
    }
}
</script>