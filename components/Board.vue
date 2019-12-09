<template>
  <div class="flex justify-center h-full">
    <div class="flex h-full py-12 overflow-x-scroll">
      <div
        v-for="list in board.lists.nodes"
        :key="list.id"
        class="px-3 py-3 mr-4 bg-gray-100 rounded rounded-lg column-width"
      >
        <p class="font-sans text-sm font-semibold tracking-wide text-gray-700">
          {{ list.name }}
        </p>
        <draggable
          v-model="list.cards.nodes"
          :animation="200"
          @add="updateList(list.id)"
          @change="move"
          draggable=".card"
          ghost-class="ghost-card"
          group="cards"
        >
          <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
          <card
            v-for="card in list.cards.nodes"
            :key="card.id"
            :card="card"
            class="mt-3 cursor-move card"
          />
          <card-footer :list-id="list.id" />
        </draggable>
        <!-- <cards :cards="list.cards.nodes" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import draggable from 'vuedraggable'
// import Cards from '@/components/Cards'
import Card from '@/components/Card'
import CardFooter from '@/components/CardFooter'
export default {
  name: 'Board',
  components: {
    CardFooter,
    Card,
    // Cards,
    draggable
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      lists: this.board.lists.nodes,
      lastMovedCardId: null
    }
  },
  methods: {
    async updateList(listId) {
      const cardId = this.lastMovedCardId
      await this.updateCard(cardId, listId)
      console.log('Moved card:', cardId)
    },
    async updateCard(cardId, listId) {
      const input = {
        id: cardId,
        patch: {
          listId
        }
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateCard($input: UpdateCardInput!) {
              updateCard(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          },
          refetchQueries: ['boards']
        })
      } catch (error) {
        console.error(error)
      }
    },
    move(e) {
      console.log('end', e)
      this.lastMovedCardId = e.added ? e.added.element.id : e.removed.element.id
    }
  }
}
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
.ghost-card {
  @apply border opacity-50 border-blue-500 bg-gray-200;
}
</style>
