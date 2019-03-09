import Vue from 'vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(ShoppingCart)
}).$mount('#app')
