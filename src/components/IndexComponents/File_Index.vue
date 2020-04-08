<template>
    <div id="File">
        <Row>
            <div>
                <Button type="primary" :size="large">Submit</Button>
            </div>
        </Row>
        <br>
        <Row>
            <div class="editor" id="editor" ref="editor"></div>
        </Row>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import Editor from 'wangeditor'

export default {
    name: 'File',
    data (){
        return {
            editor: ""
        }
    },
    methods: {
    },
    mounted(){
        this.editor = new Editor("#editor");
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            //'backColor',  // 背景颜色
            //'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            //'emoticon',  // 表情
            //'image',  // 插入图片
            // 'table',  // 表格
            //'video',  // 插入视频
            //'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];
        // 聚焦时候函数
        this.editor.customConfig.onfocus = function(){
            console.log("onfocus");
        };
        this.editor.customConfig.onblur = function(){
            console.log("onblur");
        };
        this.editor.customConfig.onchange = function(text){
            console.log(text);
        };
        this.editor.create();
        this.editor.txt.html("<p>欢迎使用wangEditor编辑器</p>")
        console.log(this.editor.txt.text());
        console.log(this.editor.txt.html());
    }
}
</script>

<style>
.editor{
    width: 100%;
    height: 500px;
    margin-bottom: auto;
}
</style>