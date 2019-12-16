<template>
  <input
    @input="updateValue"
    class="w-full p-2 border rounded shadow-inner focus:outline-none focus:border-yellow-500 disabled:text-gray-700 disabled:bg-gray-500"
    type="text"
  />
</template>

<script>
export default {
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
