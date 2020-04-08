<template>
    <div>
        <div>
            <div id="terminal" ref="terminal"></div>
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
    data() {
        return {
            shellWs: "",
            term: "",
            rows: 55,
            cols: 100,
            urlParam: {
                fullTag: "",
                namespace: "",
                podName: ""
            },
            socket: null
        };
    },
    created(){
        this.wsShell();
    },
    mounted(){
        let _this = this;

        let term = new Terminal({
            rendererType:"canvas",
            rows: parseInt(_this.rows),
            cols: parseInt(_this.cols),
            convertEol: true,
            scrollback: 50,//终端中的回滚量
            disableStdin:false,
            cursorStyle: "underline",
            cursorBlink:true,
            theme: {
                foreground: "#7e9192",
                background: "#002833",
                cursor: "help",
                lineHeight: 16
            }
        });
        // const attachAddon = new AttachAddon(this.socket);
        const fitAddon = new FitAddon();
        // term.loadAddon(attachAddon);
        
        // 挂载到dom
        term.loadAddon(fitAddon);
        fitAddon.fit();
        term.open(this.$refs["terminal"]);
        term.focus();

        // 换行并输入起始字符"$"
        term.promt = () => {
            term.write("\r\n$");
        };
        term.promt();

        function runFakeTerminal(_this){
            if(term._initialized){
                return;
            }
            // 初始化
            term._initialized = true;
            term.writeln("Welcome to use Superman");
            term.writeln(
                 `This is Web Terminal of pod\x1B[1;3;31m ${_this.urlParam.podName}\x1B[0m in namespace\x1B[1;3;31m ${_this.urlParam.namespace}\x1B[0m`
            );
            term.promt();
            term.onData(function(key){
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
    methods: {
        wsShell(){
            const _this = this;
            let tag_string = this.urlParam.fullTag;
            let namespace = this.urlParam.namespace;
            let pod_name = this.urlParam.podName;
            
            let query = `?tag_string=${tag_string}&namespace=${namespace}&pod_name=${pod_name}`;
            let url = `v1/container/terminal/ws${query}`;
            
            this.shellWs = this.base.WS({
                url,
                isInit: true,
                openFn(){
                     _this.term.resize({ rows: _this.rows, cols: 100 });
                },
                messageFn(e){
                    console.log("message", e);
                    if(e){
                        let data = JSON.parse(e.data);
                        if (data.Data == "\n" || data.Data == "\r\nexit\r\n"){
                            _this.$message("连接已关闭");
                        }

                        // 打印后端返回数据
                        _this.term.write(data.Data);
                    }
                },
                errorFn(e){
                    // 出现错误关闭当前ws，并且提示
                    console.log("error", e);
                    _this.$message.error({
                        message: "ws请求失败，请刷新重试",
                        duration: 5000
                    });
                }
            });
        },

        onSend(data){
            // data = this.base.isObject(data) ? JSON.stringify(data) : data;
            // data = this.base.isArray(data) ? data.toString() : data;
            // data = data.replace(/\\\\/, "\\");
            // this.shellWs.onSend(data);
        },

        trim(str){
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    }
};
</script>
