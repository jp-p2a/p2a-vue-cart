
import * as ROUTE_NAMES from '@/constants/routeNames';
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            routeNames: ROUTE_NAMES,
            errorMessage: ""
        }
    },
    computed: {
        ...mapGetters({
            orderId: 'currentOrderId',
            selectedProducts: 'selectedProducts',
            billingId: 'billingId'
        }),
        activeRouteName() {
            return this.$route.name;
        },
    },
}