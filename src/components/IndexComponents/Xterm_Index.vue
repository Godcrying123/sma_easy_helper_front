<template>
    <div>
        <div>
            <div id='xterm' class="xterm" />
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import {AttachAddon} from 'xterm-addon-attach'
import "xterm/css/xterm.css"
import "xterm/lib/xterm.js"

export default {
    name: 'xterm',
    components: {
        Terminal,
        FitAddon,
        AttachAddon
    },
    props:{
        socketURI: {
            type: String,
            default: ''
        },
    },
    data (){
        return {
            term: null,
            socket: null,
            rows: 40,
            cols: 10,
            fontSize: 14,
            SetOut: false,
            isKey: false
        }
    },
    methods: {
        initTerm(){
            const term = new Terminal({
                rendererType: "canvas",
                rows: this.rows,
                cols: this.cols,
                scrollback: 30,
                fontSize: this.fontSize,
                disableStdin: false,
                cursorStyle: 'block',
                cursorBlink: true,
                tabStopWidth: 4,
                theme: {
                    foreground: "white",
                    background: "#060101",
                    cursor: "help"
                }
            });
            const attachAddon = new AttachAddon(this.socket);
            const fitAddon = new FitAddon();
            term.loadAddon(attachAddon);
            term.loadAddon(fitAddon);
            term.open(document.getElementById('xterm'));
            fitAddon.fit();
            term.focus();
            let _this = this;
            term.prompt = () => {
                term.write("\r\n$ ");
            };
            term.prompt();
            function runFakeTerminal(_this) {
                if(term._initialized){
                    return;
                }
                term._initialized = true;
                term.writeln();
                term.prompt();
                term.onData(function (key) {
                    let order = {
                        Data: key,
                        Op: "stdin"
                    };
                    _this.onSend(order);
                    });
                    _this.term = term;
                }
                runFakeTerminal(_this);
                },
        //webShell主题
    initSocket () {
      const WebSocketUrl = "连接后台的地址"
      this.socket = new WebSocket(
        WebSocketUrl
      );
      this.socketOnClose(); //关闭
      this.socketOnOpen(); //
      this.socketOnError();
    },
    //webshell链接成功之后操作
    socketOnOpen () {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm();
      };
    },
    //webshell关闭之后操作
    socketOnClose () {
      this.socket.onclose = () => {
        console.log("close socket");
      };
    },
    //webshell错误信息
    socketOnError () {
      this.socket.onerror = () => {
        console.log("socket 链接失败");
      };
    },
    //特殊处理
    onSend (data) {
      data = this.base.isObject(data) ? JSON.stringify(data) : data;
      data = this.base.isArray(data) ? data.toString() : data;
      data = data.replace(/\\\\/, "\\");
      this.shellWs.onSend(data);
    },
    //删除左右两端的空格
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    },
    mounted: function(){
        this.initSocket
    },
    beforeDestroy() {
        this.socket.close()
        this.term.dispose()
    },
}
</script>