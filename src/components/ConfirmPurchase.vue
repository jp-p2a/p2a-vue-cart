<template>
  <div class="home">

    <div>
      <input type="checkbox" id="checkbox" v-model="confirmedPurchase"
             @change="saveOrder()">
      <label for="checkbox">Click to Confirm purchase of Products</label>
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

export default {
  name: 'ConfirmPurchase',
    mixins: [ SharedMixin ],
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
