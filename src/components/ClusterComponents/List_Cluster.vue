<template>
    <div>
        <component v-on:clusterNameToParent="clusterGet" :is="ClusterMenu"></component>
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
            clusterSelectGet: null,
            menuCreateTemplate: ""
        }
    },
    methods: {
        clusterGet(name) {
            this.clusterSelectGet = name
            this.emitToClusterIndex()
        },
        emitToClusterIndex(){
            // console.log(this.clusterSelect)
            this.$emit('clusterNameToIndex', this.clusterSelectGet)
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
                    emitToClusterParent(){
                      this.$emit('clusterNameToParent', this.clusterSelect)
                    }
                },
                watch: {
                    clusterSelect: function () {
                        this.emitToClusterParent()
                    }
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
