<template>
    <div>
        <div>
            <Row>
                <h3>Operation</h3>
                <span>please select the wanted operation steps and then go to next step, and this step is not mandatory</span>
            </Row>
            <br/>
            <Row>
                <RadioGroup>
                    <Poptip trigger="hover" content="This is operation for installing the nginx" placement="bottom-start">
                        <Radio label="Nginx" border></Radio>
                    </Poptip>
                    <Radio label="Oracle" border></Radio>
                    <Radio label="NFS" border></Radio>
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
export default {
    name: 'operation',
    data (){
        return {
            operation_data: ""
        }
    },
    methods: {
        operationInfoGet(){
            this.$axios.get('http://localhost:3000/operations').then((response)=>{
                this.operation_data = response.data[0].DetailedSteps
                // console.log(this.operation_data)
            }).catch((function(error){
                console.log(error)
            }))
        }
    },
    mounted: function(){
        this.operationInfoGet()

    }
}
</script>