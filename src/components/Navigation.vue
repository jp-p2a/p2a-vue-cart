<template>
  <div id="navigationContainer">
    <nav class="navigation__container navigation__container--fixed">
      <div id="nav"
           class="navigation__steps">

        <div>
          <h3>
            <router-link
                    :class="getActiveClass(routeNames.CART)"
                    :to="{ name: routeNames.CART }"
                    class="navigation__steps-element--inactive">
              <span>Cart</span>
            </router-link>
          </h3>
        </div>

        <div>
          <h3>
            <router-link
                    :class="getActiveClass(routeNames.BILLING_INFO) "
                    :to="{ name: routeNames.BILLING_INFO } "
                    class="navigation__steps-element--inactive">
              <span>Billing Info</span>
            </router-link>
          </h3>
          <!--<svg-->
                  <!--xmlns="http://www.w3.org/2000/svg"-->
                  <!--class="navigation__breadcrumbActiveIcon">-->
            <!--<use :xlink:href="getBreadCrumbSvg(routeNames.BILLING_INFO)"/>-->
          <!--</svg>-->
        </div>

        <div>
          <h3>
            <router-link
                    :class="getActiveClass(routeNames.CONFIRM_PURCHASE)"
                    :to="{ name: routeNames.CONFIRM_PURCHASE }"
                    class="navigation__steps-element--inactive">
              <span>Confirm Purchase </span>
            </router-link>
          </h3>
          <!--<svg-->
                  <!--xmlns="http://www.w3.org/2000/svg"-->
                  <!--class="navigation__breadcrumbActiveIcon">-->
            <!--<use :xlink:href="getBreadCrumbSvg(routeNames.CONFIRM_PURCHASE)"/>-->
          <!--</svg>-->
        </div>

        <div v-if="orderId">
          <h3>
            <router-link
                    :class="getActiveClass(routeNames.THANK_YOU)"
                    :to="{ name: routeNames.THANK_YOU, params: { orderId } }"
                    class="navigation__steps-element--inactive">
              <span>Thank You</span>
            </router-link>
          </h3>
          <!--<svg-->
                  <!--xmlns="http://www.w3.org/2000/svg"-->
                  <!--class="navigation__breadcrumbInactiveIcon">-->
            <!--<use :xlink:href="getBreadCrumbSvg(routeNames.THANK_YOU)"/>-->
          <!--</svg>-->
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
import SharedMixin from "@/mixins/shared.js";

export default {
  name: 'Navigation',
    mixins: [ SharedMixin ],
    methods: {
        getBreadCrumbSvg(routeName) {
            if (this.activeRouteName === routeName) {
                return "/volt.svg#breadcrumbActiveIcon";
            }
            return "/volt.svg#breadcrumbInactiveIcon";
        },
        getActiveClass(routeName) {

            const navDisabledClass = this.navigationDisabled
                ? "disabled-router-link"
                : "";
            return this.activeRouteName === routeName
                ? `navigation__steps-element--active ${navDisabledClass}`
                : `navigation__steps-element--inactive ${navDisabledClass}`;
        },

    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  #nav {
    padding: 30px;
    display: inline-block;
    grid-template-columns: 1fr 1fr;
  float: left;

  a {
    font-weight: bold;
    color: #2c3e50;
  &.router-link-exact-active {
     color: #42b983;
   }
  }
  }

  .navigation__home-link-container:hover .custom-tooltip__navigation {
    visibility: visible;
  }

  .btn-group {
    flex-basis: 65%;
    margin-right: 42px;
  }

  .hover-opacity:hover {
    opacity: 0.5;
  }

  .navigation__container--fixed {
    position: absolute;
    z-index: 3;
    top: 0;
  }

  .form__save-finish-margin {
    margin-top: 70px;
  }

</style>
