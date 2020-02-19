import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Mycenter from '../pages/mycenter.vue'
import EditUserInfo from '../pages/editUserInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/mycenter',
    name: 'Mycenter',
    component: Mycenter
  },
  {
    path: '/editUserInfo',
    name: 'EditUserInfo',
    component: EditUserInfo
  }
]

const router = new VueRouter({
  routes
})

export default router
