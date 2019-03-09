<template>
  <div id="navigationContainer">

    <div id="nav">
      <router-link :to="{ name: 'cart' }">
        Cart
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Navigation',
}
</script>
