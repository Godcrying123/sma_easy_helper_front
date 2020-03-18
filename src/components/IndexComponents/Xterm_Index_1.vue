<template>
    <div style="height:100%;background:#002833l">
        <div id="terminal" ref="terminal"></div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import { Terminal } from 'xterm'
import "xterm/css/xterm.css"
import "xterm/lib/xterm.js"

export default {
    name: "Shell",
    data() {
        return {
            shellWs: "",
            term: null, // 保存terminal实例
            rows: 40,
            cols: 100
        };
    },
    created(){
        this.wsShell();
    },
    mounted(){
        let _this = this;
        this.rows = document.querySelector(".indexContainer").offsetHeight / 16 -5;
        this.cols = document.querySelector(".indexContainer").offsetWidth / 14;

        let term = new Terminal({
            rendererType: "canvas",
            rows: parseInt(_this.rows),
            cols: parseInt(_this.cols),
            convertEol: true,
            disableStdin: false,
            cursorStyle: "underline",
            cursorBlink: true,
            theme: {
                foreground: "#7e9192",
                background: "#002833",
                cursor: "help",
                lineHeight: 16
            }
        });
        term.open(this.$refs["terminal"]);

        term.prompt = () => {
            term.write("\r\n$");
        }
        term.prompt();
        function runFakeTerminal(_this) {
      if (term._initialized) {
        return;
      }
      // 初始化
      term._initialized = true;

      term.writeln("Welcome to use Superman. ");
      term.writeln(
        `This is Web Terminal of pod\x1B[1;3;31m ${
          _this.urlParam.podName
        }\x1B[0m in namespace\x1B[1;3;31m ${_this.urlParam.namespace}\x1B[0m`
      );

      term.prompt();

      // / **
      //     *添加事件监听器，用于按下键时的事件。事件值包含
      //     *将在data事件以及DOM事件中发送的字符串
      //     *触发了它。
      //     * @返回一个IDisposable停止监听。
      //  * /
      //   / ** 更新：xterm 4.x（新增）
      //  *为数据事件触发时添加事件侦听器。发生这种情况
      //  *用户输入或粘贴到终端时的示例。事件值
      //  *是`string`结果的结果，在典型的设置中，应该通过
      //  *到支持pty。
      //  * @返回一个IDisposable停止监听。
      //  * /
      // 支持输入与粘贴方法
      term.onData(function(key) {
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
        wsShell() {
            const _this = this;
            let tag_string = this.urlParam.fullTag;
            let namespace = this.urlParam.namespace;
            let pod_name = this.urlParam.podName;

            let query = `?tag_string=${tag_string}&namespace=${namespace}&pod_name=${pod_name}`;
            let url = `v1/container/terminal/ws${query}`;

            this.shellWs = this.base.WS({
                url,
                isInit: true,
                openFn() {
                //   _this.term.resize({ rows: _this.rows, cols: 100 }); //终端窗口重新设置大小 并触发term.on("resize")
                },
                messageFn(e) {
                console.log("message", e);
                if (e) {
                    let data = JSON.parse(e.data);
                    if (data.Data == "\n" || data.Data == "\r\nexit\r\n") {
                    _this.$message("连接已关闭");
                    }
                    // 打印后端返回数据
                    _this.term.write(data.Data);
                }
                },
                errorFn(e) {
                //出现错误关闭当前ws,并且提示
                console.log("error", e);
                _this.$message.error({
                    message: "ws 请求失败,请刷新重试~",
                    duration: 5000
                });
                }
            });},
        onSend(data) {
            data = this.base.isObject(data) ? JSON.stringify(data) : data;
            data = this.base.isArray(data) ? data.toString() : data;
            data = data.replace(/\\\\/, "\\");
            this.shellWs.onSend(data);
            },
        trim(str){
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }


    }
    
}
</script>