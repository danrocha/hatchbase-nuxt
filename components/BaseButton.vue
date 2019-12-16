<template>
  <button
    :disabled="loading"
    class="p-2 text-sm font-bold tracking-wide text-yellow-900 uppercase bg-yellow-500 border border-yellow-600 rounded shadow"
  >
    <half-circle-spinner v-if="loading" :animation-duration="1000" :size="20" />
    <slot v-if="!loading" />
  </button>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'
export default {
  components: {
    HalfCircleSpinner
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
