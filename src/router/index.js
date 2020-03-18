import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Cluster from '@/components/ClusterComponents/Cluster'
import Log from '@/components/LogComponents/Log'
import Setup from '@/components/SetupComponents/Setup'
import Operation from '@/components/OperationComponents/Operation'
import Action from '@/components/IndexComponents/Index'
import Login from '@/components/Login'

/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
Vue.use(Router)

const routers = [{
        path: '/action',
        name: 'Action',
        component: Action
    },
    {
        path: '/setup',
        name: 'Setup',
        component: Setup
    },
    {
        path: '/cluster',
        name: 'Cluster',
        component: Cluster
    },
    {
        path: '/log',
        name: 'Log',
        component: Log
    },
    {
        path: '/operation',
        name: 'Operation',
        component: Operation
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

export default routers