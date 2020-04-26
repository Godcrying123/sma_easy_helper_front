<template>
    <div>
        <Row>
            <Col span="4">
                <label>Excute Command:</label>
            </Col>
            <Col span="16">
                <Input v-model="execCommand" placeholder="Enter something..." clearable style="width: 95%" />
            </Col>
            <Col span="4">
                <Button type="primary" long @click="excuteCommand">Excute</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <div id="terminal" ref="terminal"></div>
        </Row>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import {Terminal} from 'xterm'
// import {FitAddon} from 'xterm-addon-fit'
// import {AttachAddon} from 'xterm-addon-attach'

import {Base64} from 'js-base64'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks'
import * as search from 'xterm/lib/addons/search/search'
import * as fullscreen from "xterm/lib/addons/fullscreen/fullscreen"
import "xterm/dist/xterm.css"

import config from '@/libs/config'
import {sshMachineInit} from '../../apis/api'

let bindTerminalResize = (term, websocket) => {
    let onTerminalResize = size => {
        websocket.send(
            JSON.stringify({
                type: "resize",
                rows: size.rows,
                cols: size.cols
            })
        );
    };
    // register resize event
    term.on("resize", onTerminalResize);
    // unregister resize event when WebSocket closed
    websocket.addEventListener("close", function(){
        term.off("resize", onTerminalResize);
    });
};
let bindTerminal = (term, websocket, bidirectional, bufferedTime) => {
    term.socket = websocket;
    let messageBuffer = null;
    let handleWebSocketMessage = function (ev) {
        // console.log(ev.data)
        if (bufferedTime & bufferedTime > 0) {
            if (messageBuffer) {
                messageBuffer += ev.data;
            } else {
                messageBuffer = ev.data;
                setTimeout(function(){
                    term.write(messageBuffer);
                }, bufferedTime);
            }
        } else {
            term.write(ev.data)
        }
    };
    websocket.onmessage = handleWebSocketMessage;
    let handleTerminalData = function (data) {
        websocket.send(
            JSON.stringify({
                type: "cmd",
                cmd: Base64.encode(data) //encode data as base64 format
            })
        );
    };
    if(bidirectional) {
        term.on('data', handleTerminalData);
    }

    // send heartbeat package to avoid closing webSocket connection in some proxy environment such as nginx
    let heartBeatTimer = setInterval(function (){
        websocket.send(JSON.stringify({type: "heartbeat", data: ""}));
    }, 20 * 1000);

    websocket.addEventListener("close", function(){
        websocket.removeEventListener("message", handleWebSocketMessage);
        term.off("data", handleTerminalData);
        delete term.socket;
        clearInterval(heartBeatTimer);
    });
};
export default {
    name: "Shell",
    props: ["execCommand", 'Machine'],
    data() {
        return {
            isFullScreen:false,
            searchKey:"",
            v: this.visible,
            ws: null,
            term: null,
            thisV: this.visible,
            shellWs: "",
            term: null, // 保存terminal实例
            rows: 50,
            cols: 100,
            terminalEntity: null
        };
    },
    watch: {
        visible(val) {
            this.v = val; //新增result的watch，监听变更并同步到myResult上
        }
    },
    computed: {
        termTitle(){
            if (this.obj && this.obj.cluster_ssh) {
                return `${this.obj.cluster_ssh.ssh_user || ''}@{this.obj.ssh_ip}:${this.obj.ssh_port}`
            }
            return ""
        },
        wsUrl() {
            let token = localStorage.getItem('token');
            // let testURL = ''
            let testURL = `${config.wsBase}/api/v1/ws/`
            return testURL
        }
    },
    methods: {
        runRealTerminal(){
            console.log("websocket is running")
        },
        closeRealTerminal(){
            console.log("websocket is closed")
        },
        onWindowResize(){
            this.term.fit(); //it will make terminal resized
        },
        doLink(ev, url) {
            if(ev.type === 'click'){
                window.open(url)
            }
        },
        excuteCommand(){
            if (this.term == null) {
                console.log("the term has not been initilized")
            } else if (this.ws == null) {
                console.log("the websocket has not been initilized")
            } else  {
                let handleTerminalData = function (data, websocket) {
                    websocket.send(
                    JSON.stringify({
                        type: "cmd",
                        cmd: Base64.encode(data) //encode data as base64 format
                    })
                );
            };
            // console.log(this.execCommand)
            handleTerminalData(this.execCommand, this.ws)
            }
        },
        doClose(){
            window.removeEventListener("resize", onWindowResize);
            term.off("resize", this.onTerminalResize);
            if(this.ws) {
                this.ws.close()
            }
            if (this.term) {
                this.term.dispose()
            }
            this.$emit("afterClose")
        },
        doOpen(){},
        doOpened(){
            // Terminal.applyAddon(fit)
            // Terminal.applyAddon(webLinks)
            // Terminal.applyAddon(search)
            this.term = new Terminal({
                rendererType: "canvas",
                rows: this.rows,
                cols: this.cols,
                fontSize: 18,
                cursorBlink: true,
                cursorStyle: 'bar',
                bellStyle: "sound",
                theme: {
                    foreground: "#7e9192",
                    background: "#002833",
                    lineHeight: 16
                }
            });
            // const fitAddon = new FitAddon();
            // this.term.loadAddon(fitAddon)
            // fitAddon.fit()
            this.term.open(this.$refs.terminal);
            this.term.focus()
            // this.term.fit(); //first resizing
            // this.term.webLinksInit(this.doLink);
            window.addEventListener("resize", this.onWindowResize);
            this.ws = new WebSocket(this.wsUrl);
            this.ws.onclose = (ce) => {
                this.term.setOption("cursorBlink", false);
                if (ce.code != 1005) {
                    this.$notify.error({
                        title: `code $(ce.code)`,
                        message: ce.reson,
                    });
                    this.doClose()
                }
            };
            bindTerminal(this.term, this.ws, true, -1)
            bindTerminalResize(this.term, this.ws)
        },
        async initMachineFunc(MachineEntity) {
          if (this.Machine != null) {
            await sshMachineInit(MachineEntity).then(response => {
              this.doOpened()
            }).catch(error => {
                console.log(error)
            })
          }
        }
    },
    mounted(){
      this.initMachineFunc(this.Machine)
    }
}
</script>
