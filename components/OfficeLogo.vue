<template>
  <img
    :src="logoSrc"
    loading="lazy"
    class="overflow-hidden border border-gray-200 rounded"
  />
</template>

<script>
export default {
  props: {
    officeName: {
      type: String,
      default: ''
    },
    companyLogo: {
      type: String,
      default: ''
    },
    seed: {
      type: Number,
      required: true
    }
  },
  computed: {
    logoSrc() {
      if (this.companyLogo) return this.companyLogo
      if (this.officeName)
        return `https://avatars.dicebear.com/v2/initials/${this.officeName}.svg`
      return `https://avatars.dicebear.com/v2/identicon/${this.seed}.svg`
    }
  }
}
</script>

<style lang="scss" scoped></style>
