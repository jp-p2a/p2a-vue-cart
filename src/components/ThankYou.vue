<template>
  <div class="home">
    Thank You for your purchase! We have received your order.
    <br />
    Order # {{ orderId }} . We appreciate your business!
  </div>
</template>

<script>

export default {
  name: 'ThankYou',
    props: {
      orderId: {
          type: Number,
          required: true
      }
    },
    beforeRouteEnter (to, from, next) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        next(vm => {

            if (!vm.orderId) {
                alert("You must confirm your purchase before Seeing the confirmation page");
                return vm.$router.back();
            }
        });
    },
}
</script>
