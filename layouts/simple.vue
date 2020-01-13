<template>
  <div class="h-full max-w-md p-12 mx-auto mt-8 bg-white shadow-md">
    <header class="flex items-center mb-12">
      <logo class="w-10 h-10 mr-2 text-yellow-500 fill-current" />
      <h1 class="text-lg font-bold text-black">hatchbase</h1>
    </header>
    <nuxt />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>

<style>
body,
html,
#__nuxt {
  @apply h-screen antialiased text-black;
}

.v--modal {
  @apply mt-8;
}
</style>
