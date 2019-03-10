<template>
  <div class="home">
    The {{ currentRoutePath }} URL could not be found. Please try again!
  </div>
</template>

<script>

export default {
  name: 'NotFound',
    computed: {
        currentRoutePath() {
            return this.$route.fullPath;
        },
    },
}
</script>
