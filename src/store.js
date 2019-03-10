import Vue from 'vue'
import Vuex from 'vuex'
import {
    uniqBy as _uniqBy,
    findIndex as _findIndex,
    isEmpty as _isEmpty
} from "lodash";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentOrderId: null,
    selectedProducts: {}
  },
  mutations: {
      currentOrderId(state, orderId) {
          state.currentOrderId = orderId;
      },
      selectedProducts(state, product) {
          const { id } = product;

          if (!id) {
              return false;
          }

          state.selectedProducts = {
              ...state.selectedProducts,
              [id]: product
          }
          return true;
      },
      removeSelectedProduct(state, product) {
          const { id } = product;
          if (!id) {
              return false;
          }

          Vue.delete(state.selectedProducts, id);

          return true;
      }
  },
  actions: {
      currentOrderId({commit}, orderId) {
          commit('currentOrderId', orderId);
      },
      selectedProducts({commit}, product) {
          commit('selectedProducts', product);
      },
      removeSelectedProduct({commit}, product) {
          commit('removeSelectedProduct', product);
      },
  },
    getters: {
        currentOrderId(state) {
            return state.currentOrderId;
        },
        selectedProducts(state) {
            return state.selectedProducts || {};
        },
    }
})
