import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
import http from "./http";
import axios from "axios";

import Vant from "vant";
import "vant/lib/index.css";

import { Area } from "vant";
import { AddressList } from "vant";

Vue.use(AddressList);
Vue.use(Area);
Vue.use(Vant);
Vue.prototype.$api = api;
Vue.prototype.$axios = http;
Vue.config.productionTip = false;

// 响应拦截
axios.defaults.timeout = 10000; // 设置超时时间
// 过滤请求结果 只返回结果的data
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
// 挂载
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
