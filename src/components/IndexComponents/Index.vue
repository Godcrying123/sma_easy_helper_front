<template>
    <div>
        <Layout>
            <Sider hidder-trigger :style="{background: '#fff'}">
                <Operation v-on:operationToIndex="getSubStep"></Operation>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', background: '#fff'}">
                    <component :is="TabTemplate"></component>
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
            split1: 0.25,
            TabSelect: null
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
                this.TabSelect = value.Machine + " || " + value.StepType
                console.log(this.TabSelect)
                this.changeTabWindows()
            }
        },
        changeTabWindows () {
            var html = '<Tabs type="card" id="indexTab" :value="TabValue" closable @on-tab-remove="handleTabRemove">';
            for (const key in this.TabSet) {
                if (this.TabSet.hasOwnProperty(key)) {
                    const element = this.TabSet[key];
                    const tabName = element.Machine+" || "+element.StepType
                    if (element.StepType == 'SSH') {
                        html += '<TabPane label="'+ tabName +'" v-if="tab0" name="'+ tabName +'"><Xterm></Xterm></TabPane>'
                    } else if (element.StepType == 'File') {
                        html += '<TabPane label="'+ tabName +'" v-if="tab0" name="'+ tabName +'"><File></File></TabPane>'
                    } else if (element.StepType == 'Image'){
                        html += '<TabPane label="'+ tabName +'" v-if="tab0" name="'+ tabName +'"><NotiImage></NotiImage></TabPane>'
                    }  else if (element.StepType == 'URL'){
                        html += '<TabPane label="'+ tabName +'" v-if="tab0" name="'+ tabName +'">URL</TabPane>'
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
                        tab2: true,
                        TabValue: `${this.TabSelect}`
                    }
                },
                template: `${this.TabCreateTemplate}`,
                methods: {
                    handleTabRemove (name) {
                        this['tab' + name] = false;
                    }
                },
                watch: {
                    TabValue: function(val) {
                        console.log(val)
                    }
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