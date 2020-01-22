<template>
  <div class="ui">
    <navbar class="mx-2" />
    <nav class="px-2"></nav>
    <div class="w-full overflow-x-auto">
      <nuxt />
    </div>
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

<style lang="scss">
$appbar-height: 40px;
$boardbar-height: 3rem;

.ui {
  height: 100vh;
  display: grid;
  grid-template-rows: $appbar-height $boardbar-height 1fr;
}
</style>
