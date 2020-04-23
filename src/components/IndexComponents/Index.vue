<template>
    <div>
        <Layout>
            <Sider hidder-trigger :style="{background: '#fff'}">
                <Operation v-on:operationToIndex="getSubStep"></Operation>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '1000px', background: '#fff'}">
                    <component v-on:tabList="getTabList" :Machine="Machine" :indexTabList="indexTabList" :execCommandMain="execCommandMain" :FileMain="FileMain" :FileChangeMain="FileChangeMain" :TabSet="TabSet" :TabSelect="TabSelect" :is="TabTemplate"></component>
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

import {initClusterRead} from "../../apis/api";

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
            execCommandMain: "",
            FileMain: "",
            FileChangeMain: "",
            MachineMap: {},
            Machine: {}
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
            this.Machine = value.Machine
            this.FileMain = value.File
            this.FileChangeMain = value.FileChange
            this.TabSet[value.SubOperationID] = value
            // this.TabSelect = value.Machine + "||" + value.StepType + "||" + value.SubOperation_ID
            this.TabSelect = "tab" + value.SubOperationID
            this.changeTabWindows()
        },
        machineMap(){
            initClusterRead().then(response => {
                for (const key in response.data.Machines) {
                    this.MachineMap[response.data.Machines[key].Label] = response.data.Machines[key]
                }
                // console.log(this.MachineMap)
            }).catch(error => {
                console.log(error)
            })
        },
        changeTabWindows () {
            let html = '<Tabs type="card" id="indexTab" :animated=false :value="TabSelect" closable @on-tab-remove="handleTabRemove">';
            for (const key in this.TabSet) {
                if (this.TabSet.hasOwnProperty(key)) {
                    const element = this.TabSet[key];
                    const tabLabel = "[" + element.StepType + "]" + element.Machine + "|" + element.SubOperationID
                    const tabName = "tab" + element.SubOperationID
                    const vifLabel = element.SubOperationID - 1;
                    if (element.StepType == 'SSH') {
                        html += '<TabPane v-if="tabList['+ vifLabel +']" name="'+ tabName +'" label="'+ tabLabel +'" ><Xterm :Machine="Machine" :execCommand="execCommand" ></Xterm></TabPane>'
                    } else if (element.StepType == 'File') {
                        html += '<TabPane v-if="tabList['+ vifLabel +']" name="'+ tabName +'" label="'+ tabLabel +'" ><File :Machine="Machine" :File="File" :FileChange="FileChange" ></File></TabPane>'
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
                props: ['TabSelect', 'TabSet', 'indexTabList', 'execCommandMain', 'FileMain', 'FileChangeMain', 'Machine'],
                data(){
                    return{
                        tabList: [],
                        tabSelectName: null,
                        execCommand: "",
                        File: "",
                        FileChange: ""
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
                    this.File = this.FileMain
                    this.FileChange = this.FileChangeMain
                    var length = Object.keys(this.TabSet).length
                    this.tabList = this.indexTabList
                    for (const key in this.TabSet) {
                        var index = parseInt(key - 1)
                        this.tabList[index] = true
                    }
                },
            }
        }
    },
    mounted() {
        this.machineMap()
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
