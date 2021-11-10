import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Login = () => import('pages/login/Login.vue')
const Register = () => import('pages/resiger/Register.vue')
const Home = () => import('pages/home/Home.vue')
const News = () => import('pages/news/News.vue')
const Funny = () => import('pages/funny/Funny.vue')
const Mine = () => import('pages/mine/Mine.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        islogin: true,
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: {
        islogin: true,
      }
    },
    {
      path: '/funny',
      name: 'funny',
      component: Funny,
      meta: {
        islogin: true,
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        islogin: true,
      }
    },
  ]
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

