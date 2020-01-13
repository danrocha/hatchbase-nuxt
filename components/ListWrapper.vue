<template>
  <div class="min-h-full mr-4 column-width">
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
  min-width: 320px;
  width: 320px;
}
</style>
