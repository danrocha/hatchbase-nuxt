<template>
  <div class="hidden"></div>
</template>

<script>
export default {
  mounted() {
    const component = this
    this.handler = function(e) {
      component.$emit('keyup', e)
    }
    window.addEventListener('keyup', this.handler)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handler)
  }
}
</script>
