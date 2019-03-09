import Vue from 'vue'
import Router from 'vue-router'
import CartContainer from '@/components/CartContainer';
import ConfirmPurchase from '@/components/ConfirmPurchase';
import * as ROUTE_NAMES from '@/constants/routeNames';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.CART,
      component: CartContainer,
    },
      {
          path: '/billingInfo',
          name: ROUTE_NAMES.BILLING_INFO,
          // route level code-splitting
          // this generates a separate chunk (customerInfo.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "billingInfo" */ '@/components/BillingInfo.vue')
      },
      {
          path: '/confirmPurchase',
          name: ROUTE_NAMES.CONFIRM_PURCHASE,
          component: ConfirmPurchase,
          props: route => ({
              orderId: parseInt(route.params.orderId, 10)
          }),
      },
      {
          path: '/:orderId/thank-you',
          name: ROUTE_NAMES.THANK_YOU,
          component: () => import(/* webpackChunkName: "thankYou" */ '@/components/ThankYou.vue'),
          props: route => ({
              orderId: parseInt(route.params.orderId, 10)
          }),
      },

      { path: "*",
        component: () => import(/* webpackChunkName: "notFound" */ '@/components/NotFound.vue')
       }
  ]
})
