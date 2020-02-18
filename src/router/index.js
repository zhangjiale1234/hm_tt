import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
