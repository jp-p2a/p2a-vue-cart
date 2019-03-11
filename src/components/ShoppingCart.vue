<template>
  <div id="shopping-cart">
    <div>
      <navigation />
    </div>

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation';

export default {
  name: 'ShoppingCart',
  components: {
      Navigation
  }
}
</script>

<style lang="scss">
  @import url(https://use.typekit.net/yay2glb.css);

  #shopping-cart {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
