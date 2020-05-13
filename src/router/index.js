import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Forgetpass from '@/pages/Forgetpass'
import New_file from '@/pages/New_file'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/forgetpass',
      name: 'Forgetpass',
      component: Forgetpass
    },{
      path: '/new_file',
      name: 'New_file',
      component: New_file
    }
  ]
})
