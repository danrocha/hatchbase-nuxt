<template>
  <div class="h-full p-4">
    <base-loader />
    <navbar class="mb-8" />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
body,
html,
#__nuxt {
  @apply h-screen antialiased;
}

.v--modal {
  @apply mt-8;
}
</style>
