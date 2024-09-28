import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import BaiduMap from 'vue-baidu-map'

import './router/auth'
import './assets/icon-fonts/iconfont.css'
import './assets/icon-fonts/iconfont'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'small' })
Vue.use(BaiduMap, {
  // ak: 'm1egiNAw5hycWKMETIKxwQsnWSvGF2ic' // 请替换为您的百度地图API应用程序密钥
  ak: 'CcLGeiLbZV14YfeWnWADkIccdKYyz2Kq' // 请替换为您的百度地图API应用程序密钥
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)  //ElementUI
}).$mount('#app')
