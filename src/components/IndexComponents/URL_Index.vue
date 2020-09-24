<template>
    <div>
        {{ Notification }}
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    name: 'URL',
    props: ['URL', 'Notification'],
    data (){
        return {}
    },
    methods: {
        URLNav(){
            if (this.URL != ""){
                window.open(this.URL, '_blank');
            }
        }
    },
    mounted: function(){
        // console.log(this.URL)
        // console.log(this.Notification)
        this.URLNav()
    }
}
</script>