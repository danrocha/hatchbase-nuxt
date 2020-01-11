<template>
  <div>
    <div class="flex items-center justify-end h-12 px-2">
      <button-close @click="$emit('close')" />
    </div>

    <!-- eslint-disable-next-line vue/require-component-is -->
    <component
      :is="component"
      v-bind="props"
      class="px-4 pb-4 sm:px-8 sm:pb-8 md:px-10 md:pb-10 lg:px-12 lh:pb-10"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import CardAddModal from '@/components/CardAddModal'
import CardDetails from '@/components/CardDetails'
import ButtonClose from '@/components/ButtonClose'
export default {
  components: {
    CardDetails,
    CardAddModal,
    ButtonClose
  },
  props: {
    modalComponent: {
      type: String,
      default: ''
    },
    modalProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      component: this.modalComponent,
      props: this.modalProps
    }
  },
  created() {
    this.$bus.$on('modal-card-details', (e) => {
      this.props.card = e
      this.component = 'CardDetails'
    })
  }
}
</script>

<style lang="scss" scoped></style>
