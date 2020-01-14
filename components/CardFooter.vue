<template>
  <button
    slot="footer"
    role="group"
    class="flex items-center justify-center w-full p-1 mt-3 bg-white border border-white shadow-md hover:border-black"
    @click="addNewCard"
  >
    <i class="el-icon-plus"></i>
  </button>
</template>

<script>
import ModalContainer from '@/components/ModalContainer'
export default {
  name: 'CardFooter',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listId: this.list.id
    }
  },
  computed: {
    nextOrder() {
      return this.list.cards.totalCount
        ? this.getNextOrder(this.list.cards.nodes)
        : 0
    }
  },
  methods: {
    getNextOrder(cards) {
      return (
        cards.map((card) => card.order).reduce((a, b) => Math.max(a, b)) + 1
      )
    },
    addNewCard() {
      this.$modal.show(
        ModalContainer,
        {
          modalComponent: 'CardAddModal',
          modalProps: { listId: this.listId, nextOrder: this.nextOrder }
        },
        {
          name: 'modal-container',
          adaptive: true,
          maxWidth: 800,
          clickToClose: true,
          height: 'auto',
          scrollable: true
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
