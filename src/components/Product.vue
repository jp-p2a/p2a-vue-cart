<template>
  <div class="products-container">
    <table class="table__container">
      <tr>
        <td class="cell-text">
          <p>{{ product.name }}</p>
        </td>
        <td class="cell-text">
          <p>{{ product.price }}</p>
        </td>

        <td class="cell-text">

          <input
                  :id="product.id"
                  :key="product.id"
                  :checked="isProductSelected"
                  :value="isProductSelected"
                  type="checkbox"
                  @change="setAddProductToCart($event.target.checked)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
    import { mapActions, } from "vuex";
    import {
        isEmpty as _isEmpty
    } from "lodash";
    import SharedMixin from "@/mixins/shared.js";

export default {
  name: 'Product',
    props: {
      product: {
          type: Object,
          required: true
      }
    },
    mixins: [ SharedMixin ],
    computed: {
        activeRouteName() {
            return this.$route.name;
        },
        isProductSelected() {

            const record = this.selectedProducts[this.product.id] || {};
            return !_isEmpty(record);
        }
    },
    methods: {
        ...mapActions({
            selectProduct: 'selectedProducts',
            removeSelectedProduct: 'removeSelectedProduct'
        }),
        setAddProductToCart(isSelected) {

            if (isSelected) {
                this.selectProduct(this.product);
            } else {
                this.removeSelectedProduct(this.product);
            }
            this.$emit('setAddProductToCart', { product: this.product, isSelected });
        },
    }
}
</script>

<style lang="scss" scoped>

  .products-container {
    width: 40%;
    margin-left: 150px;
  }

  .table__container {
    margin: 8px 32px;
  }

  td {
    padding: 0.6em 1em !important;
  }


  td,
  th {
    border: none;
  }

  th {
    text-align: left;
  &:hover {
     cursor: pointer;
   }
  }

  tr {
    border: 1px solid #ccd2d9;
    height: 52px;
  &:hover {
     background-color: #cee5fc !important;
   }
  }

  table {
    display: table;
    width: 100%;
  }

  td {
    padding-top: 10px;
  }

  tr,
  th {
    background-color: #fff !important;
  }

  .cell-text {
    max-width: 0.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 8px;
  }

</style>