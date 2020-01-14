<template>
  <div class="min-h-full column-width">
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
