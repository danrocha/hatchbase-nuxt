<template>
  <div
    class="absolute inset-0 flex p-4 overflow-x-auto overflow-y-hidden bg-gray-300"
  >
    <article v-for="list in lists" :key="list.id" class="flex-none mr-4">
      <header class="relative flex items-center justify-between h-12 p-4">
        <h1 class="font-bold">{{ list.name }}</h1>
        <span class="font-mono text-sm">{{ list.cards.totalCount }}</span>
        <span class="absolute right-0 -mr-4 text-gray-500">&rarr;</span>
      </header>
      <div class="h-4"></div>
      <draggable
        v-model="list.cards.nodes"
        :animation="200"
        draggable=".card"
        ghost-class="ghost-card"
        group="cards"
        class="h-full overflow-y-auto bg-gray-200 rounded-top list"
        tag="ul"
        @change="change($event, list)"
      >
        <card
          v-for="card in list.cards.nodes"
          :key="card.id"
          :card="card"
          class="mb-2 cursor-pointer card"
        />
      </draggable>
    </article>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, mapActions } from 'vuex'
import Card from '@/components/Card'
export default {
  name: 'KanbanBoard',
  components: {
    draggable,
    Card
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      lists: this.board.lists.nodes.slice()
    }
  },
  computed: {
    ...mapState({
      localLoading: (state) => state.board.localLoading
    })
  },
  methods: {
    ...mapActions(['board/boardTransition']),
    change(evt, list) {
      // console.group('change')
      // console.log('evt', evt)
      // console.log('list', list)
      // console.groupEnd('change')
      // debugger
      this['board/boardTransition']({ type: 'UPDATE_LIST', params: { list } })
      // await this.updateListCards(list.id, list.cards.nodes)
    }
  }
}
</script>

<style scoped>
article {
  width: 320px;
}
#jobs-kanban {
  @apply absolute inset-0;
  display: grid;
  grid-template-rows: 40px 1fr;
}

.ghost {
  @apply border opacity-50 border-black bg-white;
}
</style>
