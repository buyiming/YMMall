import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueLazyload from "vue-lazyload";
// 全局引入vant
import vant from "vant";
import "vant/lib/index.css";



Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(VueLazyload,{
  loading:require('@/assets/img/common/placeholder.png')
})
Vue.use(vant);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
