<template>
    <div>
        <div>
            <Button :size="buttonSize">Go Back</Button>
            <Button type="primary" :size="buttonSize">Next Step</Button>
            <Button type="success" :size="buttonSize" v-if="confirmdisplay">Confirm</Button>
        </div>
        <br>
        <div>
            <Info :contentId='contentId' v-if='info'></Info>
            <Cluster :contentId='contentId' v-if='cluster'></Cluster>
            <Operation :contentId='contentId' v-if='operation'></Operation>
            <CheckForm v-on:checkFormToContent="getChildValue" :contentId='contentId' v-if='checkform'></CheckForm>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
import Info from './Info_Setup'
import Cluster from './Cluster_Setup'
import Operation from './Operation_Setup'
import CheckForm from './CheckForm_Setup'

export default {
    name: 'Content_Setup',
    components: {
        Info,
        Cluster,
        Operation,
        CheckForm
    },
    props:['cateId','contentId'],
    data (){
        return {
            info: true,
            cluster: false,
            operation: false,
            checkform: false,
            buttonSize: 'large',
            confirmdisplay: true
        }
    },
    methods: {
        getChildValue(value){
            this.confirmdisplay = value
        }
    },
    watch: {
        cateId: function(){
            if (this.cateId === '1'){
                this.info = true,
                this.cluster = false,
                this.operation = false,
                this.checkform = false
            } else if (this.cateId === '2'){
                this.info = false,
                this.cluster = true,
                this.operation = false,
                this.checkform = false
            } else if (this.cateId === '3'){
                this.info = false,
                this.cluster = false,
                this.operation = true,
                this.checkform = false
            } else if (this.cateId === '4'){
                this.info = false,
                this.cluster = false,
                this.operation = false,
                this.checkform = true
            }
        }
    },
    mounted: function(){
        this.getChildValue()
    }
}
</script>