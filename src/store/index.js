import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    islogin: false,
    backUrl: "",
  },
  mutations: {
    loginstatus(state, flag) {
      if (flag) state.islogin = true; else state.islogin = false;
    },
    changeBackUrl(state, url) {
      state.backUrl = url;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store