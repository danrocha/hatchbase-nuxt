<template>
  <div slot="footer" class="bg-white shadow-md">
    <list-actions v-if="adding" @success-add="reset">
      <template v-slot="{ loading, addList }">
        <form class="p-4" @submit.prevent="addList(name, boardId, nextOrder)">
          <input
            v-model="name"
            type="text"
            placeholder="Column title"
            class="w-full h-full p-2 mb-2 text-sm border border-black shadow-inset focus:outline-none"
            autofocus
          />
          <div class="flex">
            <button
              :disabled="loading"
              type="submit"
              class="px-4 py-1 mr-4 text-sm font-bold tracking-wide text-white uppercase bg-black shadow-md hover:shadow-lg focus:outline-none"
            >
              ADD
            </button>
            <button
              class="text-xs text-gray-600 hover:underline"
              @click="adding = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </template>
    </list-actions>
    <button
      v-else
      class="flex items-center justify-center w-full p-1 text-sm border border-white hover:border-black"
      @click="adding = true"
    >
      <i class="mr-2 el-icon-plus"></i> new column
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
