<template>
  <div class="home">

    <div>
      <h3>
        <router-link :to="{ name: routeNames.BILLING_INFO }">
          <span>Back</span>
        </router-link>
      </h3>
    </div>

    <order-products :allow-remove-products="false" />

    <div>
      <button id="confirmPurchase"
              @click.prevent="saveOrder()">
        I confirm that I want to purchase the above products
      </button>
    </div>
  </div>
</template>

<script>
    import {
        isEmpty as _isEmpty
    } from "lodash";
    import { mapActions, mapGetters } from "vuex";
    import SharedMixin from "@/mixins/shared.js";
    import ApiRequestsHelper from "@/services/api/Api";
    import * as ENDPOINTS from "@/constants/endPoints";
    import OrderProducts from '@/components/OrderProducts';

export default {
  name: 'ConfirmPurchase',
    mixins: [ SharedMixin ],
    components: {
        OrderProducts
    },
    beforeRouteEnter (to, from, next) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        next(vm => {

            if (!vm.billingId) {
                alert("Billing Information must be saved first before proceeding");
                return vm.$router.back();
            }
        });
    },

    async beforeRouteLeave (to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.

        // if not going to Thank you route, allow for navigation
        if (this.$route.meta.next !== to.name) {
            return next();
        }

        if (!this.confirmedPurchase) {
            alert("You must confirm your purchase first before proceeding");
            return next(false);
        }

        await this.submitOrder();

        if (!_isEmpty(this.errorMessage)) {
            return next(false);
        }
        next();
    },

    data() {
      return {
          confirmedPurchase: false
      }
    },
    methods: {
        ...mapActions({
            setOrderId: 'currentOrderId',
        }),

        async saveOrder() {
            await this.submitOrder();
            this.confirmedPurchase = true;
            const params = { orderId: this.orderId };
            this.$router.push({ name: this.$route.meta.next, params });
        },
        async submitOrder() {
            const params = { billingId: this.billingId };
            const apiResponse = await ApiRequestsHelper.postRecords(this, ENDPOINTS.ORDER, params);
            this.setOrderId(apiResponse.orderId);
        }
    }
}
</script>
