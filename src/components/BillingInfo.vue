<template>
  <div>

    <div v-if="errorMessage"> {{ errorMessage }}</div>

    <div class="form-container">

    <div>
      <input
              v-model="customerInfo.firstName"
              type="text"
              placeholder="Enter First Name"
              id="input-name"
              tabindex="2">
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
              v-model="customerInfo.zipCode"
              type="text"
              placeholder="Enter Your ZipCode"
              id="input-name"
              tabindex="2">
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

export default {
  name: 'BillingInfo',
    mixins: [ SharedMixin ],
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
              zipCode: null
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
