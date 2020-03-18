<template>
    <div>
        <div v-if="step1" id="step1">
            <h3>Instructions:</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">1. This tool is helping customer to use SMA related script better.</li>
                <li class="list-group-item">2. Please first add your VM machines for different environment in this website.</li>
                <li class="list-group-item">3. After adding your VM, please select the steps you would like to operate for this env.</li>
                <li class="list-group-item">4. Please enjoy using this tool after select the VM and step.</li>
                <li class="list-group-item">5. Please feel free to contact us if you have any problems in using this tool.</li>
            </ul>
        </div>
        <div v-if="step2" id="step2">
        </div>
        <div v-if="step3" id="step3">
        </div>
        <div v-if="step4" id="step4">
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
export default {
    name: 'info',
    props: ['contentId'],
    data (){
        return {
            step1: true,
            step2: false,
            step3: false,
            step4: false
        }
    },
    methods: {
    },
    watch: {
        contentId: function(){
            if (this.contentId === '1'){
                this.step1 = true,
                this.step2 = false,
                this.step3 = false,
                this.step4 = false
            } else if (this.contentId === '2'){
                this.step1 = false,
                this.step2 = true,
                this.step3 = false,
                this.step4 = false
            } else if (this.contentId === '3'){
                this.step1 = false,
                this.step2 = false,
                this.step3 = true,
                this.step4 = false
            } else if (this.contentId === '4'){
                this.step1 = false,
                this.step2 = false,
                this.step3 = false,
                this.step4 = true
            }
        }
    },
    mounted: function(){
    }
}
</script>