<template>
  <div class="p-12">
    <header class="flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-900">{{ card.name }}</h2>
      <button-close @click="$emit('close')" />
    </header>
  </div>
</template>

<script>
import ButtonClose from '@/components/ButtonClose'
export default {
  name: 'CardDetails',
  components: {
    ButtonClose
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
