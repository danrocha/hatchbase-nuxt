<template>
  <button
    class="flex items-center justify-center w-6 h-6 bg-white border border-transparent focus:outline-none boder-white focus:border focus:border-yellow-400"
    @click="$emit('click')"
  >
    <more-horizontal-icon />
  </button>
</template>

<script>
import { MoreHorizontalIcon } from 'vue-feather-icons'
export default {
  components: {
    MoreHorizontalIcon
  }
}
</script>

<style lang="scss" scoped></style>
