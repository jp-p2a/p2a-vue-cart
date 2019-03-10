import Vue from 'vue'
import Router from 'vue-router'
import CartContainer from '@/components/CartContainer';
import ConfirmPurchase from '@/components/ConfirmPurchase';
import BillingInfo from '@/components/BillingInfo';
import ThankYou from '@/components/ThankYou';
import NotFound from '@/components/NotFound';
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
        meta: {
            next: ROUTE_NAMES.CONFIRM_PURCHASE,
            previous: null
        }
    },
      {
          path: '/billingInfo',
          name: ROUTE_NAMES.BILLING_INFO,
          // route level code-splitting
          // this generates a separate chunk (customerInfo.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: BillingInfo,//() => import(/* webpackChunkName: "billingInfo" */ '@/components/BillingInfo.vue'),
          meta: {
              next: ROUTE_NAMES.CONFIRM_PURCHASE,
              previous: ROUTE_NAMES.CART
          }
      },
      {
          path: '/confirmPurchase',
          name: ROUTE_NAMES.CONFIRM_PURCHASE,
          component: ConfirmPurchase,
          props: route => ({
              orderId: parseInt(route.params.orderId, 10)
          }),
          meta: {
              next: ROUTE_NAMES.THANK_YOU,
              previous: ROUTE_NAMES.BILLING_INFO
          },
          children: [
              {
                  path: '/:orderId/thank-you',
                  name: ROUTE_NAMES.THANK_YOU,
                  components: {
                      confirmPurchase: ThankYou
                  },
                  props: route => ({
                      orderId: parseInt(route.params.orderId, 10)
                  }),
                  meta: {
                      next: null,
                      previous: ROUTE_NAMES.CONFIRM_PURCHASE
                  }
              },
          ]
      },

      { path: "*",
        component: NotFound //() => import(/* webpackChunkName: "notFound" */ '@/components/NotFound.vue')
       }
  ]
})
