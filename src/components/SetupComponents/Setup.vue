<template>
    <div>
        <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" >
            <Menu :active-name="currentMenu" theme="light" width="auto" :open-names="['1', '2', '3', '4']"  @on-select='contentSwitch'>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="md-alert"></Icon>
                        Instructions
                    </template>
                    <MenuItem name="1-1">Step 1</MenuItem>
                    <MenuItem name="1-2">Step 2</MenuItem>
                    <MenuItem name="1-3">Step 3</MenuItem>
                    <MenuItem name="1-4">Step 4</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-browsers"></Icon>
                        Cluster Select
                    </template>
                    <MenuItem name="2-1">Cluster Review</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Operation Select
                    </template>
                    <MenuItem name="3-1">Operation Review</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="logo-buffer"></Icon>
                        Select Confirm
                    </template>
                    <MenuItem name="4-1">Check Form</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px 24px'}">
            <Content :style="{padding: '24px', minHeight: '1000px', background: '#fff'}">
                <ContentSetup v-on:nextMenuToIndex="getNextMenu" :cateId='cateId' :contentId='contentId' :currentMenu="currentMenu"></ContentSetup>
            </Content>
        </Layout>
    </Layout>
        <router-view></router-view>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import ContentSetup from './Content_Setup'

export default {
    name: 'Setup',
    components: {
        ContentSetup
    },
    data (){
        return {
            cateId: 0,
            contentId: 0,
            currentMenu: "1-1",
        }
    },
    methods: {
        contentSwitch(name){
            this.cateId = name.split('-')[0]
            this.contentId = name.split('-')[1]
            this.currentMenu = name
        },
        getNextMenu(value){
            this.currentMenu = value
            this.contentSwitch(value)
        }
    },
    mounted: function(){
    }
}
</script>