<template>
  <div>
    <div
      slot="footer"
      v-if="adding"
      role="group"
      class="px-3 pt-3 pb-5 mt-3 bg-white border border-yellow-500 rounded"
    >
      <card-actions @success-add="reset">
        <template v-slot="{ loading, addCard }">
          <form @submit.prevent="addCard(name, listId, nextOrder)">
            <input
              v-model="name"
              type="text"
              placeholder="Position name"
              class="w-full h-full mb-4 text-sm focus:outline-none"
              autofocus
            />
            <div class="flex">
              <button
                :disabled="loading"
                type="submit"
                class="px-4 py-1 mr-4 text-sm font-bold tracking-wide text-yellow-900 uppercase bg-yellow-500 rounded shadow hover:shadow-lg focus:outline-none focus:border focus:border-yellow-900"
              >
                ADD
              </button>
              <button
                @click="adding = false"
                class="text-xs text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        </template>
      </card-actions>
    </div>
    <div
      slot="footer"
      v-else
      role="group"
      class="px-3 pt-3 pb-5 mt-3 bg-white border border-white rounded opacity-50"
    >
      <div class="flex justify-center">
        <button
          @click="addNewCard"
          class="flex items-center justify-center w-12 h-12 text-lg font-bold border rounded-full hover:border-yellow-500"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CardActions from '@/components/CardActions'
import CardAddModal from '@/components/CardAddModal'
export default {
  name: 'CardFooter',
  components: {
    CardActions
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      adding: false,
      name: null,
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
    reset() {
      this.adding = false
      this.name = null
    },
    getNextOrder(cards) {
      return (
        cards.map((card) => card.order).reduce((a, b) => Math.max(a, b)) + 1
      )
    },
    addNewCard() {
      this.$modal.show(
        CardAddModal,
        { listId: this.listId, nextOrder: this.nextOrder },
        {
          name: 'card-details',
          width: '90%',
          clickToClose: false,
          height: 'auto',
          scrollable: true
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
