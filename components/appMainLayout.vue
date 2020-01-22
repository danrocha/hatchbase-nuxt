<template>
  <div id="app-main">
    <div class="bg-white border-b">
      <slot name="top-bar" />
    </div>
    <div class="relative">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMainLayout'
}
</script>

<style lang="scss" scoped>
#app-main {
  @apply absolute inset-0;
  display: grid;
  grid-template-rows: 64px 1fr;
}
</style>
