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
          component: BillingInfo,
          meta: {
              next: ROUTE_NAMES.CONFIRM_PURCHASE,
              previous: ROUTE_NAMES.CART
          }
      },
      {
          path: '/confirmPurchase',
          name: ROUTE_NAMES.CONFIRM_PURCHASE,
          component: ConfirmPurchase,
          meta: {
              next: ROUTE_NAMES.THANK_YOU,
              previous: ROUTE_NAMES.BILLING_INFO
          },
      },

      {
          path: '/:orderId/thank-you',
          name: ROUTE_NAMES.THANK_YOU,
          component: ThankYou,
          props: route => ({
              orderId: parseInt(route.params.orderId, 10)
          }),
          meta: {
              next: null,
              previous: ROUTE_NAMES.CONFIRM_PURCHASE
          }
      },

      {
        // This route will be resolved for any Routes not matched
        path: "*",
        component: NotFound
       }
  ]
})
