<template>
  <div class="h-full p-4">
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
.v--modal {
  @apply mt-8;
}
</style>
