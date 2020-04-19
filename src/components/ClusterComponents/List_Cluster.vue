<template>
    <div>
        <component :is="ClusterMenu"></component>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    name: 'List',
    props: ["clusterListData"],
    data (){
        return {
            clusterSelect: null,
            menuCreateTemplate: ""
        }
    },
    methods: {
        clusterClick(name) {
            this.clusterSelect = name
        },
        emitToClusterIndex(event){
            // console.log(this.clusterSelect)
            this.$emit('clusterNameToIndex', this.clusterSelect)
        },
        changeMenu() {
            var html = '<Menu theme="light" width="auto" @on-select="clusterClick">'
            for (const key in this.clusterListData) {
                const element = this.clusterListData[key]
                html += '<MenuItem theme="light" name="'+ element.Name +'" >'+ element.Name +'</MenuItem>'
            }
            html += "</Menu>"
            this.menuCreateTemplate = html
        }

    },
    watch: {
        clusterListData: function() {
            this.changeMenu()
        }
    },
    computed: {
        ClusterMenu: function() {
            return {
                props: ["clusterListData"],
                data() {
                    return {
                        clusterSelect: null
                    }
                },
                methods: {
                    clusterClick(name) {
                        this.clusterSelect = name
                    },
                },
                template: `${this.menuCreateTemplate}`
            }
        }
    },
    mounted(){
        // this.changeMenu()
        
    }
}
</script>