<template>
    <div>
        <Layout>
            <Sider hidder-trigger :style="{background: '#fff'}">
                <Operation v-on:operationToIndex="getSubStep"></Operation>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '1000px', background: '#fff'}">
                    <component v-on:tabList="getTabList" :indexTabList="indexTabList" :execCommandMain="execCommandMain" :TabSet="TabSet" :TabSelect="TabSelect" :is="TabTemplate"></component>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import Xterm from './Xterm_Index'
import Operation from './Operation_Index'
import File from './File_Index'
import NotiImage from './Image_Index'
import Notification from './Notification_Index'

export default {
    name: 'Action',
    components: {
        Operation,
        Notification
    },
    data (){
        return {
            TabSet: {},
            indexTabList: [],
            // split1: 0.25,
            TabSelect: "",
            execCommandMain: ""
        }
    },
    props: {
        tab0: true,
        tab1: true,
        tab2: true,
        TabCreateTemplate: '',
    },
    methods: {
        getSubStep(value){
            this.execCommandMain = value.Commands
            this.TabSet[value.SubOperation_ID] = value
            // this.TabSelect = value.Machine + "||" + value.StepType + "||" + value.SubOperation_ID
            this.TabSelect = "tab" + value.SubOperation_ID
            this.changeTabWindows()
        },
        changeTabWindows () {
            var html = '<Tabs type="card" id="indexTab" :animated=false :value="TabSelect" closable @on-tab-remove="handleTabRemove">';
            for (const key in this.TabSet) {
                if (this.TabSet.hasOwnProperty(key)) {
                    const element = this.TabSet[key];
                    const tabLabel = "[" + element.StepType + "]" + element.Machine + "|" + element.SubOperation_ID
                    const tabName = "tab" + element.SubOperation_ID
                    var vifLabel =  element.SubOperation_ID - 1
                    if (element.StepType == 'SSH') {
                        html += '<TabPane v-if="tabList['+ vifLabel +']" name="'+ tabName +'" label="'+ tabLabel +'" ><Xterm :execCommand="execCommand" ></Xterm></TabPane>'
                    } else if (element.StepType == 'File') {
                        html += '<TabPane v-if="tabList['+ vifLabel +']" name="'+ tabName +'" label="'+ tabLabel +'" ><File></File></TabPane>'
                    } else if (element.StepType == 'Image'){
                        html += '<TabPane v-if="tabList['+ vifLabel +']" name="'+ tabName +'" label="'+ tabLabel +'" ><NotiImage></NotiImage></TabPane>'
                    }  else if (element.StepType == 'URL'){
                        html += '<TabPane v-if="tabList['+ vifLabel +']" name="'+ tabName +'" label="'+ tabLabel +'" >URL</TabPane>'
                    } 
                }
            }
            html += '</Tabs>'
            this.TabCreateTemplate = html
        },
        getTabList(value){
            this.indexTabList = value
            this.changeTabWindows()
        }
    },
    computed: {
        TabTemplate: function(){
            return {
                components: {
                    Xterm,
                    File,
                    NotiImage,
                },
                props: ['TabSelect', "TabSet", "indexTabList", "execCommandMain"],
                data(){
                    return{
                        tabList: [],
                        tabSelectName: null,
                        execCommand: ""
                    }
                },
                template: `${this.TabCreateTemplate}`,
                methods: {
                    handleTabRemove (name) {
                        this.tabSelectName = name.slice(3)
                        this.tabList[parseInt(this.tabSelectName) - 1] = false;
                        delete this.TabSet[this.tabSelectName]
                        this.emitTabListToIndex()
                        this.emitTabSetToIndex()
                    },
                    emitTabListToIndex(event){
                        this.$emit('tabList', this.tabList)
                    },
                    emitTabSetToIndex(event){
                        this.$emit('TabSet', this)
                    }
                },
                watch: {
                    'this.tabList': function(val){
                        console.log(val)
                    }
                },
                mounted() {
                    this.execCommand = this.execCommandMain
                    var length = Object.keys(this.TabSet).length
                    this.tabList = this.indexTabList
                    for (const key in this.TabSet) {
                        var index = parseInt(key - 1)
                        this.tabList[index] = true
                    }
                },
            }
        }
    }
}
</script>

<style>
.demo-split{
        height: 1000px;
        border: 0.5px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 5px;
    }
</style>