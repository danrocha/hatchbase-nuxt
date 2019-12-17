<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      loader: null
    }
  },
  created() {
    this.$bus.$on('loader-start', (options) => {
      this.loader = this.$loading.show({
        container: null,
        color: '#ECC94B',
        loader: 'spinner',
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        opacity: 0.5,
        zIndex: 999,
        ...options
      })
    })
    this.$bus.$on('loader-stop', () => {
      this.loader.hide()
    })
  }
}
</script>

<style lang="scss" scoped></style>
