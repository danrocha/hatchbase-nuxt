<template>
  <div
    :class="`bg-${color}-100 text-${color}-700`"
    class="flex items-center h-6 px-3 text-xs font-semibold rounded-full"
  >
    <span :class="`bg-${color}-400`" class="w-2 h-2 mr-1 rounded-full"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'teal'
    }
  }
}
</script>
