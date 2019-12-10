<template>
  <button
    @click="$emit('click')"
    class="flex items-center justify-center w-6 h-6 bg-white border rounded-full focus:outline-none boder-white focus:border focus:border-yellow-400"
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
