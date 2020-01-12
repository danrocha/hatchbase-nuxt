<template>
  <div class="flex justify-center bg-gray-200">
    <!-- <div class="flex h-full py-12 overflow-x-scroll"> -->
    <draggable
      v-model="board.lists.nodes"
      :animation="200"
      draggable=".list"
      ghost-class=".ghost-list"
      filter=".card"
      class="flex pb-12 overflow-x-scroll"
      @change="moveList"
    >
      <list-wrapper
        v-for="list in board.lists.nodes"
        :key="list.id"
        class="cursor-pointer list"
      >
        <list-header :list="list" />
        <card-footer v-if="list.name === 'Inbox'" :list="list" />
        <draggable
          v-model="list.cards.nodes"
          :animation="200"
          draggable=".card"
          ghost-class="ghost-card"
          group="cards"
          @change="change($event, list)"
        >
          <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
          <card
            v-for="card in list.cards.nodes"
            :key="card.id"
            :card="card"
            class="mt-3 card"
          />
        </draggable>
        <!-- <cards :cards="list.cards.nodes" /> -->
      </list-wrapper>

      <list-wrapper class="self-start">
        <lists-footer :board="board" />
      </list-wrapper>
    </draggable>
    <!-- </div> -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
import draggable from 'vuedraggable'
// import Cards from '@/components/Cards'
import Card from '@/components/Card'
import CardFooter from '@/components/CardFooter'
import ListWrapper from '@/components/ListWrapper'
import ListsFooter from '@/components/ListsFooter'
import ListHeader from '@/components/ListHeader'
export default {
  name: 'Board',
  components: {
    ListHeader,
    ListsFooter,
    ListWrapper,
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
    async change(evt, list) {
      console.group('change')
      console.log('evt', evt)
      console.log('list', list)
      console.groupEnd('change')
      await this.updateListCards(list.id, list.cards.nodes)
    },
    async updateListCards(listId, cards) {
      const input = {
        listId,
        cards: [...cards].reverse()
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateListCards($input: UpdateListCardsInput!) {
              updateListCards(input: $input) {
                list {
                  id
                  name
                }
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
    async moveList(e) {
      if (e.moved) {
        await this.updateListOrder()
      }
    },
    async updateListOrder() {
      const input = {
        lists: this.board.lists.nodes
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateBoardListOrder($input: UpdateBoardListOrderInput!) {
              updateBoardListOrder(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    defineAction(e) {
      if (e.added) return 'added'
      if (e.removed) return 'removed'
      return 'moved'
    }
  }
}
</script>

<style scoped>
.ghost-card {
  @apply border opacity-50 border-blue-500 bg-gray-200;
}
.ghost-list {
  @apply border opacity-50 border-blue-500 bg-white;
}
</style>
