<template>
  <div class="min-h-full px-3 py-3 mr-4 bg-gray-200 column-width">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ListWrapper'
}
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
</style>
