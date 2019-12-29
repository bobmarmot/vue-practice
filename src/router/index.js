import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/User.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'



Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: Login
}, {
  path: '/home',
  component: Home,
  children: [{
    path: '/users',
    component: User
  }, {
    path: '/rights',
    component: Rights
  }, {
    path: '/roles',
    component: Roles
  }, {
    path: '/categories',
    component: Cate
  }, {
    path: '/params',
    component: Params
  }, {
    path: '/goods',
    component: GoodsList
  }, {
    path: '/goods/add',
    component: Add
  }, {
    path: '/orders',
    component: Order
  }, {
    path: '/reports',
    component: Report
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果用户是访问的login这个页面 就让它访问 如果它访问不是的login  我们需要判断它是否登录 看看 token有没有 如果没有 说明它没有登录
  if (to.path === '/login') {
    next()
  } else {
    // 表示它想要访问网站后台  判断有没有token
    const tokenStr = window.sessionStorage.getItem('token')
    // 没有登录
    if (!tokenStr) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
