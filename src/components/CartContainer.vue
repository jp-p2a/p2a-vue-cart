<template>
  <div class="home">

    <div v-if="hasProducts">

      <table class="table-container">
        <tr>
          <th class="cell-text"><span>Product</span></th>
          <th class="cell-text"><span>Price</span></th>
          <th class="cell-text"><span>Add to Cart</span></th>
        </tr>
      </table>

      <product v-for="product in products"
               :key="product.id"
               :product="product" />

      </table>
    </div>
  </div>
</template>

<script>
    import {
        isEmpty as _isEmpty
    } from "lodash";
import ApiRequestsHelper from "@/services/api/Api";
    import SharedMixin from "@/mixins/shared.js";
import * as ENDPOINTS from "@/constants/endPoints";
    import Product from '@/components/Product';

export default {
  name: 'CartContainer',
    components: {
        Product
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
        onMounted() {
            this.fetchProducts();
        },
        async fetchProducts() {
            const products = await ApiRequestsHelper.fetchRecords(this, ENDPOINTS.PRODUCTS);

            if (!_isEmpty(products)) {
                this.products = products;
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