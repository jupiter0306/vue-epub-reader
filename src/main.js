import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.less'

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router
}).$mount('#app')
