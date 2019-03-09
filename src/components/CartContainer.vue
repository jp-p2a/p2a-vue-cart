<template>
  <div class="home">
    <div v-for="product in products"
         :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'CartContainer',
    data() {
      return {
          products: [
              {
                  id: 1234,
                  name: 'Mac'
              },
              {
                  id: 554,
                  name: 'Google Pixel'
              },
              {
                  id: 444,
                  name: 'Samsung S10'
              },

              {
                  id: 883,
                  name: 'iPhone 10'
              },
          ]
      }
    }
}
</script>
