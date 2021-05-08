import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(VueLazyload,{

})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
