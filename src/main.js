import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import store from './store'
import './utils/flexible.min'
import 'vant/lib/index.css';
import { post, get, patch, put } from './network/axios'
import VueLazyLoad from 'vue-lazyload'
import waterfall from 'vue-waterfall2'

Vue.use(waterfall)
Vue.use(VueLazyLoad, { error: '/static/image/public/error.png', loading: '/static/image/public/loading.png' })
Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

router.beforeEach((to, from, next) => {
  let token = store.state.islogin;
  let token2;
  if (localStorage.getItem('islogin') != null && localStorage.getItem('islogin') != undefined) {
    token2 = JSON.parse(localStorage.getItem('islogin')).data;
  } else { token2 = false; }
  store.commit('changeBackUrl', to.name)
  if (to.meta.islogin) { if (token || token2) { next() } else { next({ path: '/login', }) } } else { next() }
})

/* eslint-disable no-new */
new Vue({ el: '#app', router, render: h => h(App) })
