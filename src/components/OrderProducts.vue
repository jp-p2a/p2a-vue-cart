<template>
  <div>

    <div>

      <table class="table-container">
        <tr>
          <th class="cell-text"><span>Product</span></th>
          <th class="cell-text"><span>Price</span></th>
          <th class="cell-text"><span></span></th>
        </tr>
      </table>

      <product v-for="product in selectedProducts"
               :key="product.id"
               :product="product"
               :allow-remove-products="allowRemoveProducts"
      />

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
    import Product from '@/components/Product';

export default {
  name: 'OrderProducts',
    props: {
        allowRemoveProducts: {
            type: Boolean,
            default: true
        },

    },
    components: {
        Product
    },
    mixins: [ SharedMixin ],
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