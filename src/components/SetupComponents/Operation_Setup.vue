<template>
    <div>
        <div>
            <Row>
                <h3>Operation</h3>
                <span>please select the wanted operation steps and then go to next step, and this step is not mandatory</span>
            </Row>
            <br/>
            <Row>
                <RadioGroup v-model="operationSelected">
                    <Poptip trigger="hover" content="This is operation for installing the nginx" placement="bottom-start">
                        <Radio label="nginx" border></Radio>
                    </Poptip>
                    <Radio label="oracle" border></Radio>
                    <Radio label="nfs" border></Radio>
                    <Radio label="No Selection" border></Radio>
                </RadioGroup>
            </Row>
            <Row>
                <Collapse simple accordion>
                    <Panel>
                        Operation_1
                        <p slot="content">
                            This is a test
                        </p>
                    </Panel>
                </Collapse>
            </Row>
        </div>
        <div></div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

import {operationList} from "../../apis/api";

export default {
    name: 'operation',
    props: ['OperationSelectedValue'],
    data (){
        return {
            operationSelected: null,
            operationData: []
        }
    },
    methods: {
        operationInfoGet(){
            operationList().then(response => {
                // console.log(response.data)
                this.operationData = response.data
            }).catch(error => {
                console.log(error)
            })
        },
        emitToContent(event){
            this.$emit('operationToContent', this.operationSelected)
        }
    },
    watch: {
        operationSelected: function(){
            this.emitToContent()
        }
    },
    mounted: function(){
        this.operationInfoGet()
        this.operationSelected = this.OperationSelectedValue
    }
}
</script>
