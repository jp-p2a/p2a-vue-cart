import Vue from 'vue'
import Router from 'vue-router'
import CartContainer from '@/components/CartContainer';
import ConfirmPurchase from '@/components/ConfirmPurchase';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cart',
      component: CartContainer,
        children: [
            {
                path: '/billingInfo',
                name: 'billingInfo',
                // route level code-splitting
                // this generates a separate chunk (customerInfo.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/components/BillingInfo.vue')
            },
            {
                path: '/:orderId/confirmPurchase',
                name: 'confimPurchase',
                component: ConfirmPurchase,
                props: route => ({
                    orderId: parseInt(route.params.orderId, 10)
                }),
            },
            {
                path: '/:orderId/thank-you',
                name: 'thankYou',
                component: () => import(/* webpackChunkName: "about" */ '@/components/ThankYou.vue'),
                props: route => ({
                    orderId: parseInt(route.params.orderId, 10)
                }),
            },
        ]
    },

      { path: "*",
        component: () => import(/* webpackChunkName: "about" */ '@/components/NotFound.vue')
       }
  ]
})
