<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <Operation v-on:operationToIndex="getSubStep"></Operation>
            </div>
            <div slot="right" class="demo-split-pane">
                <div :style="{padding: '10px 10px 10px'}">
                    <component :is="TabTemplate"></component>
                </div>
            </div>
        </Split>
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
        Notification,
    },
    data (){
        return {
            TabSet: {},
            split1: 0.25,
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
            if (this.TabSet[value.SubOperation_ID] == null) {
                this.TabSet[value.SubOperation_ID] = value
                this.changeTabWindows()
            }
        },
        changeTabWindows () {
            var html = '<Tabs type="card" id="indexTab" closable @on-tab-remove="handleTabRemove">';
            for (const key in this.TabSet) {
                if (this.TabSet.hasOwnProperty(key)) {
                    const element = this.TabSet[key];
                    // console.log(element.StepType)
                    // console.log(element.SubOperation_ID)
                    if (element.StepType == 'SSH') {
                        html += '<TabPane label="'+ element.StepType +'" v-if="tab0"><Xterm></Xterm></TabPane>'
                    } else if (element.StepType == 'File') {
                        html += '<TabPane label="'+ element.StepType +'" v-if="tab0"><File></File></TabPane>'
                    } else if (element.StepType == 'Image'){
                        html += '<TabPane label="'+ element.StepType +'" v-if="tab0"><NotiImage></NotiImage></TabPane>'
                    }  else if (element.StepType == 'URL'){
                        html += '<TabPane label="'+ element.StepType +'" v-if="tab0">URL</TabPane>'
                    }
                }
            }
            html += '</Tabs>'
            this.TabCreateTemplate = html
            // console.log(this.TabTemplate)
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
                data(){
                    return{
                        tab0: true,
                        tab1: true,
                        tab2: true
                    }
                },
                template: `${this.TabCreateTemplate}`,
                methods: {
                    handleTabRemove (name) {
                        this['tab' + name] = false;
                    },
                }
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