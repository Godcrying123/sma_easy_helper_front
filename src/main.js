// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import VueRouter from 'vue-router'
import routers from './router'
import axios from 'axios'
// import QS from 'QS'
// import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'

/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.use(VueRouter)
    // Vue.use(axios)

Vue.prototype.$axios = axios

const router = new VueRouter({
    mode: 'history',
    routes: routers
})

// the code for handling the NavigationDuplicated error
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: `<div id="app">
  <template>
    <Menu mode="horizontal" theme="primary" active-name="1" @on-select='routerMenu' >
        <MenuItem name="Setup">
            <Icon type="ios-paper" />Setup
        </MenuItem>
        <MenuItem name="Action">
            <Icon type="ios-aperture-outline" />Action
        </MenuItem>
        <MenuItem name="Cluster">
            <Icon type="ios-people" />Cluster
        </MenuItem>
        <MenuItem name="Operation">
            <Icon type="ios-stats" />Operation
        </MenuItem>
        <MenuItem name="Log">
            <Icon type="ios-construct" />Log
        </MenuItem>
    </Menu>
  </template>
  <router-view></router-view>
  </div>
  `,
    data() {
        return { menuName: 0 }
    },
    methods: {
        routerMenu(name) {
            if (name === 'Setup') {
                this.$router.push({
                    path: '/setup'
                });
            } else if (name === 'Action') {
                this.$router.push({
                    path: '/action'
                })
            } else if (name === 'Cluster') {
                this.$router.push({
                    path: '/cluster'
                })
            } else if (name === 'Operation') {
                this.$router.push({
                    path: '/operation'
                })
            } else if (name === 'Log') {
                this.$router.push({
                    path: '/log'
                })
            }
        }
    }
}).$mount('#app')
