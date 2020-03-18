<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <!-- <Operation></Operation> -->
                <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']"  accordion>
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
            </div>
            <div slot="right" class="demo-split-pane">
                <div :style="{padding: '10px 10px 10px'}">
                    <Xterm></Xterm>
                    <!-- <File></File> -->
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
import Notification from './Notification_Index'

export default {
    name: 'Action',
    components: {
        Xterm,
        Operation,
        File,
        Notification
    },
    data (){
        return {
            split1: 0.25
        }
    },
    methods: {
    },
    mounted: function(){}
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