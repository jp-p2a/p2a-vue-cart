import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentOrderId: null,
  },
  mutations: {
      currentOrderId(state, orderId) {
          state.currentOrderId = orderId;
      },
  },
  actions: {
      currentOrderId({commit}, orderId) {
          commit(urrentOrderId, orderId);
      },
  },
    getters: {
        currentOrderId(state) {
            return state.currentOrderId;
        },
    }
})
