<template>
  <div slot="footer">
    <list-actions v-if="adding" @success-add="reset">
      <template v-slot="{ loading, addList }">
        <form @submit.prevent="addList(name, boardId, nextOrder)">
          <input
            v-model="name"
            type="text"
            placeholder="Enter a title for this card"
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
    </list-actions>
    <button
      v-else
      @click="adding = true"
      class="flex items-center justify-center w-full py-2 text-lg font-bold border rounded-lg hover:border-yellow-500"
    >
      Add new column
    </button>
  </div>
</template>

<script>
import ListActions from '@/components/ListActions'
export default {
  name: 'ListsFooter',
  components: {
    ListActions
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      boardId: this.board.id,
      nextOrder:
        this.board.lists.nodes
          .map((list) => list.order)
          .reduce((a, b) => Math.max(a, b)) + 1,
      adding: false,
      name: null
    }
  },
  methods: {
    reset() {
      this.adding = false
      this.name = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
