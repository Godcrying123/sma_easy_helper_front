<template>
    <div id='checkform'>
        <Card :bordered="false">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                Check Form
            </p>
            <p>Please confirm your selected cluster and operations, and you can review your choice in the below content.</p>
            <p>
                <br/>
                this is your selected cluster information
            </p>
            <p>
                <Table :columns="columns3"></Table>
            </p>
            <p>
                <br/>
                this is your selected operation information
            </p>
            <p>
            </p>
        </Card>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'checkform',
    data (){
        return {
            confirmDisplay:true,
            columns3: [
                {
                    title: 'Label',
                    key: 'Label',
                    fixed: 'left'
                },
                {
                    title: 'HostName',
                    key: 'HostName',
                },
                {
                    title: 'HostIp',
                    key: 'HostIp',
                },
                {
                    title: 'UserName',
                    key: 'UserName',
                },
                {
                    title: 'AuthType',
                    key: 'AuthType',
                },
                {
                    title: 'Password',
                    key: 'Password',
                },
                {
                    title: 'AuthKey',
                    key: 'AuthKey',
                }],
        }
    },
    methods: {
        emitToContent(event){
            this.$emit('checkFormToContent', this.confirmDisplay)
        }
    },
    mounted: function(){
        this.emitToContent()
    }
}
</script>