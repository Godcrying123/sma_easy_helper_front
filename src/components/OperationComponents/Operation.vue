<template>
    <div>
        <Layout>
            <Sider theme="light" hidder-trigger :style="{background: '#fff'}">
                <ListOperation v-on:operationNameToIndex="operationNameGet" :operationListData="operationListData" ></ListOperation>
            </Sider>
            <Layout :style="{padding: '24px 24px 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '380px', background: '#fff'}">
                    <ContentOperation :operationDemoData="operationDemoData" ></ContentOperation>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
import ContentOperation from './Content_Operation'
import ListOperation from './List_Operation'

export default {
    name: 'Operation',
    components: {
        ContentOperation,
        ListOperation
    },
    data (){
        return {
            operationInfoGetUrl: '',
            operationListData: [],
            operationData: [],
            operationName: "",
            operationDemoData: 
            {
                "Operation_ID": 1,
                "Operation_Description": "the operation for installing the nginx and the start the nginx server",
                "NumOfSteps": 3,
                "DetailedSteps": [
                {
                    "SubOperation_ID": 1,
                    "SubOperation_Description": "please install nginx package in the VM",
                    "Machine": "master",
                    "StepType": "SSH",
                    "Commands": [
                    {
                        "Command": "yum install nginx"
                    },
                    {
                        "Command": "cd /etc/nginx"
                    }
                    ],
                    "File": "",
                    "FileChange": "",
                    "URL": "",
                    "Image": "",
                    "Notifications": "please check the firewalld service status",
                    "CheckMethod": "rpm -qa|nginx"
                },
                {
                    "SubOperation_ID": 2,
                    "SubOperation_Description": "Configure the nginx.conf file",
                    "Machine": "master",
                    "StepType": "File",
                    "Command": [],
                    "File": "/etc/nginx/nginx.conf",
                    "FileChange": "",
                    "URL": "",
                    "Image": "",
                    "Notifications": "please make sure the file has been saved",
                    "CheckMethod": ""
                },
                {
                    "SubOperation_ID": 3,
                    "SubOperation_Description": "Open the http://localhost:8080/ page to review the page",
                    "Machine": "master",
                    "StepType": "URL",
                    "Command": [],
                    "File": "",
                    "FileChange": "",
                    "URL": "http://localhost:8080",
                    "Image": "",
                    "Notifications": "make sure the locahost and related port has not been occupied",
                    "CheckMethod": ""
                }
                ]
            }
        }
    },
    methods: {
        operationlistGet(){
            this.$axios.get('http://localhost:3000/operations').then((response)=>{
                this.operationData = response.data
                // console.log(this.operationData)
                this.operationList()
            }).catch(function(error){
                console.log(error)
            })
        },
        operationList(){
            for (let index = 0; index < this.operationData.length; index++){
                const element = {
                    ID: this.operationData[index].Operation_ID,
                    Description: this.operationData[index].Operation_Description
                }
                this.operationListData.push(element)
            }
        },
        operationNameGet(value){
            this.operationName = value
            // console.log(this.operationName)
        }
    },
    mounted(){
        this.operationlistGet()
    }
}
</script>