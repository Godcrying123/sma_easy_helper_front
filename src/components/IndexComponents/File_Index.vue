<template>
    <div id="File">
        <Row :gutter="16">
            <Col span="8">
                <div>
                    <Row>
                        <h6>File Path:</h6>
                        <Col span="22"><Input v-model="File" placeholder="Please Input the File Path" clearable style="width: 98%" /></Col>
                        <Col span="2"><Button type="primary" shape="circle" icon="ios-search" @click="fileNav"></Button></Col>
                    </Row>
                    <br>
                    <Row>
                        <Table height="500" :columns="columns1" :data="fileData"></Table>
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
                <Button type="primary" :size="large" @click="fileSave">Submit</Button>
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
import {sshMachineInit} from '../../apis/api'
import {fileDirList, fileRead, filewrite} from "../../apis/api";

export default {
    name: 'File',
    props: ['File','FileChange', 'Machine'],
    data (){
        return {
            editor: "",
            columns1: [
                {
                    title: 'File Name',
                    key: 'FileName'
                },
                {
                    title: 'Modified Time',
                    key: 'FileLastModified'
                },
                {
                    title: 'File Path',
                    key: 'FilePath',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                              cursor: 'pointer'
                            }
                        })
                    }
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    value: params.row.tag
                                },
                                 on:{
                                     click: () => {
                                         const name = params.row.FileName
                                         const path = params.row.FilePath
                                         this.handleClick(name, path)
                                     }
                                    }
                            }, 'Open')
                        ])
                    }
                }
            ],
            filePath:"",
            fileData: [],
            fileContent: ""
        }
    },
    methods: {
        fileSave(){
          this.fileSaveContent()
        },
        fileNav() {
            this.fileReadContent(this.File)
        },
        handleClick(name, path){
            let filePath = path + "/" +name
            this.File = filePath
            this.fileReadContent(filePath)
        },
        initMachineFunc(MachineEntity) {
          // console.log(MachineEntity)
          if (this.Machine != null) {
            sshMachineInit(MachineEntity).then(response => {
              // console.log(response.data)
            }).catch(error => {
              console.log(error)
            })
          }
        },
        fileList(FilePath){
          console.log(this.File)
          fileDirList(FilePath).then(response => {
              console.log(response.data)
              this.fileData = response.data
          }).catch(error => {
              console.log(error)
          })
        },
        fileReadContent(filePath){
          fileRead(filePath).then(response => {
              this.fileContent = response.data.FileContent
          }).catch(error => {
              console.log(error)
          })
        },
        fileSaveContent(){
            filewrite(this.File, this.fileContent).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    },
    watch: {
      fileContent: function () {
        this.editor.txt.text(this.fileContent)
      }
    },
    mounted(){
        this.initMachineFunc(this.Machine)
        this.fileList(this.File)
        this.fileReadContent(this.File)
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
