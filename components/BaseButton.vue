<template>
  <button
    :disabled="loading"
    class="px-2 py-1 text-sm font-bold tracking-wide text-yellow-900 uppercase bg-yellow-500 border border-yellow-600 rounded shadow disabled:opacity-50 disabled:cursor-wait"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
