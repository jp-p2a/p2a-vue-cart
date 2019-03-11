<template>
  <div>

    <div v-if="errorMessage"> {{ errorMessage }}</div>

    <div>
      <h3>
        <router-link :to="{ name: routeNames.CART }">
          <span>Back</span>
        </router-link>
      </h3>
    </div>


    <div v-if="isStepValid">
      <h3>
        <router-link :to="{ name: routeNames.CONFIRM_PURCHASE }">
          <span>Next</span>
        </router-link>
      </h3>
    </div>


    <order-products :allow-remove-products="false" />

    <div class="form-container">

    <div>
      <input
              v-model="customerInfo.firstName"
              type="text"
              placeholder="Enter First Name"
              id="input-name"
              tabindex="1">
    </div>

      <div>
      <input
              v-model="customerInfo.lastName"
              type="text"
              placeholder="Enter Your Last Name"
              id="input-name"
              tabindex="2">
    </div>

      <div>
      <input
              v-model="customerInfo.street1"
              type="text"
              placeholder="Enter Your Address1 Info"
              id="input-name"
              tabindex="3">
    </div>

      <div>
        <input
                v-model="customerInfo.street2"
                type="text"
                placeholder="Enter Your Address2 Info"
                id="input-name"
                tabindex="4">
      </div>

      <div>
        <input
                v-model="customerInfo.city"
                type="text"
                placeholder="Enter Your City"
                id="input-name"
                tabindex="5">
      </div>


      <div>
        <input
                v-model="customerInfo.zipCode"
                type="text"
                placeholder="Enter Your ZipCode"
                id="input-name"
                tabindex="6">
      </div>


      <div>
        <input
                v-model="customerInfo.cardNumber"
                type="text"
                placeholder="Enter Your Credit Card info"
                id="input-name"
                tabindex="7">
      </div>

      <div>
        <input
                v-model="customerInfo.cardSecret"
                type="text"
                placeholder="Enter Your Credit Card Secret"
                id="input-name"
                tabindex="8">
      </div>

    </div>

  </div>
</template>

<script>
    import {
        forEach as _forEach,
        isEmpty as _isEmpty
    } from "lodash";
    import { mapActions, } from "vuex";
    import SharedMixin from "@/mixins/shared.js";
    import ApiRequestsHelper from "@/services/api/Api";
    import * as ENDPOINTS from "@/constants/endPoints";
    import OrderProducts from '@/components/OrderProducts';

export default {
  name: 'BillingInfo',
    mixins: [ SharedMixin ],
    components: {
        OrderProducts
    },
    beforeRouteEnter (to, from, next) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        next(vm => {
            // access to component instance via `vm`
            if (_isEmpty(vm.selectedProducts)) {
                alert("Products must be added to cart first before proceeding");
                return vm.$router.back();
            }
        });
    },

    async beforeRouteLeave (to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.

        // if going to cart, allow for navigation
        if (this.$route.meta.previous === to.name) {
            return next();
        }

        if (!this.isStepValid) {
            alert("You must save your billing information first before proceeding");
            return next(false);
        }

        await this.saveBillingInfo();

        if (!_isEmpty(this.errorMessage)) {
            return next(false);
        }
        next();
    },
    data() {
      return {
          customerInfo: {
              firstName: null,
              lastName: null,
              street1: null,
              street2: null,
              city: null,
              zipCode: null,
              cardNumber: null,
              cardSecret: null
          },
      }
    },
    computed: {
        previousRouteName() {
            return this.$route.meta.previous;
        },
        nextRouteName() {
            return this.$route.meta.next;
        },
        isStepValid() {

            if (!_isEmpty(this.errorMessage)) {
                return false;
            }

            let isStepValid = true;
            _forEach(this.customerInfo, (value, key) => {
                if(_isEmpty(value)) {
                    isStepValid = false;
                }
            });
            return isStepValid;
        }
    },
    methods: {
        ...mapActions({
            setBillingId: 'billingId',
        }),
        navigateToRoute(toRouteName) {
            const toRoute = this.$router.resolve({ name: toRouteName }).route;
            return this.$router.push({ name: toRoute.name });
        },
        async saveBillingInfo() {
            const apiResponse = await ApiRequestsHelper.postRecords(this, ENDPOINTS.BILLING_INFO, this.customerInfo);
            this.setBillingId(apiResponse.billingId);
        }
    }


}
</script>
