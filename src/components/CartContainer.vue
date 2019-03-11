<template>
  <div>

    <div v-if="hasProducts">
      <order-products />
      <div>
        <h3>
          <router-link :to="{ name: routeNames.BILLING_INFO }">
            <span>Checkout</span>
          </router-link>
        </h3>
      </div>

    </div>
  </div>
</template>

<script>
    import { mapActions, } from "vuex";
    import {
        forEach as _forEach,
        isEmpty as _isEmpty
    } from "lodash";
import ApiRequestsHelper from "@/services/api/Api";
    import SharedMixin from "@/mixins/shared.js";
import * as ENDPOINTS from "@/constants/endPoints";
    import OrderProducts from '@/components/OrderProducts';

export default {
  name: 'CartContainer',
    components: {
        OrderProducts
    },
    mixins: [ SharedMixin ],
    mounted() {
        this.onMounted();
    },
    data() {
      return {
          products: []
      }
    },
    computed: {
        hasProducts() {
            return !_isEmpty(this.products);
        },
    },
    methods: {
        ...mapActions({
            selectProduct: 'selectedProducts',
        }),
        onMounted() {
            this.fetchProducts();
        },
        async fetchProducts() {
            const products = await ApiRequestsHelper.fetchRecords(this, ENDPOINTS.PRODUCTS);

            if (!_isEmpty(products)) {
                this.products = products;
                _forEach(products, (product) => {
                    this.selectProduct(product);
                });
            }
        },
    }
}
</script>

<style lang="scss" scoped>

  .table-container {
    width: 40%;
    margin-left: 150px;
  }
  .cell-text {
    padding-left: 1rem;
  }


</style>