<template>
  <div class="home">

    <div v-if="hasProducts">
      <div v-for="product in products"
           :key="product.id">
        {{ product.name }}
      </div>

      <div>
        <button>
          <router-link :to="{ name: 'billingInfo' }">
            Checkout
          </router-link>
        </button>
      </div>
    </div>



  </div>
</template>

<script>
    import {
        isEmpty as _isEmpty
    } from "lodash";
import ApiRequestsHelper from "@/services/api/Api";
import * as ENDPOINTS from "@/constants/endPoints";

export default {
  name: 'CartContainer',
    mounted() {
        this.onMounted();
    },
    data() {
      return {
          products: [

          ]
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
        }
    }
}
</script>
