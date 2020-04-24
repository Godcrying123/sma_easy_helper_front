<template>
    <div>
        <div>
            <Row>
                <h3>Operation</h3>
                <span>please select the wanted operation steps and then go to next step, and this step is not mandatory</span>
            </Row>
            <br/>
            <Row>
                <RadioGroup v-for="operationEntity in operationShortNameData" :key="operationEntity" v-model="operationSelected">
                  <Radio :label="operationEntity" border></Radio>
                </RadioGroup>
            </Row>
            <Row>
                <Collapse simple accordion>
                    <Panel v-for="operationEntity in operationData" :key="operationEntity">
                      {{ operationEntity.OperationShortName }}
                        <p slot="content">
                          {{ operationEntity.OperationDescription }}
                          <br/>
                          <ul class="list-group list-group-flush" v-for="StepEntity in operationEntity.DetailedSteps" :key="StepEntity.SubOperationID">
                            <li>{{ StepEntity.SubOperationDescription }}</li>
                          </ul>
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
            operationData: [],
            operationShortNameData:[]
        }
    },
    methods: {
        operationInfoGet(){
            operationList().then(response => {
                this.operationData = response.data
                console.log(this.operationData)
                this.operationShortNameGet()
            }).catch(error => {
                console.log(error)
            })
        },
        emitToContent(event){
            this.$emit('operationToContent', this.operationSelected)
        },
        operationShortNameGet(){
            for (let index = 0; index < this.operationData.length; index++){
                const element = this.operationData[index]
                this.operationShortNameData.push(element.OperationShortName)
            }
            console.log(this.operationShortNameData)
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
