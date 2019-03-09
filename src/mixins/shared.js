
import * as ROUTE_NAMES from '@/constants/routeNames';
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            routeNames: ROUTE_NAMES
        }
    },
    computed: {
        ...mapGetters({
            orderId: 'currentOrderId'
        }),
        activeRouteName() {
            return this.$route.name;
        },
    },
}