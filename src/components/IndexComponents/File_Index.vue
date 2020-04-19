<template>
    <div id="File">
        <Row :gutter="16">
            <Col span="8">
                <div>
                    <Row>
                        <h6>File Path:</h6>
                        <Col span="22"><Input v-model="execCommand" placeholder="Please Input the File Path" clearable style="width: 98%" /></Col>
                        <Col span="2"><Button type="primary" shape="circle" icon="ios-search" @click="fileNav"></Button></Col>
                    </Row>
                    <br>
                    <Row>
                        <Table height="500" :columns="columns1" :data="data2"></Table>
                    </Row>
                    <Row>
                        <Card>
                            <p slot="title">File Change Instructions</p>
                            <p>Content of card</p>
                            <p>Content of card</p>
                            <p>Content of card</p>
                        </Card>
                    </Row>
                </div>
            </Col>
            <Col span="16">
            <Row>
                <Button type="primary" :size="large">Submit</Button>
            </Row>
            <br>
            <Row>
                <div class="editor" id="editor" ref="editor"></div>
            </Row>
            </Col>
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
            editor: "",
            columns1: [
                {
                    title: 'File Name',
                    key: 'name'
                },
                {
                    title: 'Modified Time',
                    key: 'time'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, 'Open')
                        ])
                    }
                }
            ]
        }
    },
    methods: {
        fileNav() {
            console.log("I am navgating to the file")
        }
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
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];
        // editor.customConfig.zIndex = 10
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
    margin-bottom: auto;
}
.w-e-text-container{
    min-height: 700px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>