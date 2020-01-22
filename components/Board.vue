<template>
  <draggable
    v-model="listsDraggable"
    :animation="200"
    draggable=".listDraggable"
    ghost-class="ghost-list"
    filter=".card"
    class="lists"
    @change="moveList"
  >
    <!-- INBOX, does not move -->
    <div slot="header" class="mr-8 list">
      <list-header :list="listInbox" />

      <draggable
        v-model="listInbox.cards.nodes"
        :animation="200"
        draggable=".card"
        ghost-class="ghost-card"
        group="cards"
        tag="ul"
        @change="change($event, listInbox)"
      >
        <li slot="header">
          <card-footer :list="listInbox" />
        </li>
        <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
        <li v-for="card in listInbox.cards.nodes" :key="card.id" class="card">
          <card :card="card" />
        </li>
      </draggable>
    </div>
    <!-- ALL OTHER LISTS -->
    <div
      v-for="list in listsDraggable"
      :key="list.id"
      class="mr-4 cursor-pointer list listDraggable"
    >
      <list-header :list="list" />
      <draggable
        v-model="list.cards.nodes"
        :animation="200"
        draggable=".card"
        ghost-class="ghost-card"
        group="cards"
        class="cards"
        tag="ul"
        @change="change($event, list)"
      >
        <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
        <li v-for="card in list.cards.nodes" :key="card.id" class="card">
          <card :card="card" />
        </li>
      </draggable>

      <!-- <cards :cards="list.cards.nodes" /> -->
    </div>
    <!-- ADD NEW LIST BUTTON -->
    <div slot="footer" class="list-last">
      <lists-footer :board="board" />
    </div>
  </draggable>
</template>

<script>
import gql from 'graphql-tag'
import draggable from 'vuedraggable'
// import Cards from '@/components/Cards'
import Card from '@/components/Card'
import CardFooter from '@/components/CardFooter'
// import ListWrapper from '@/components/ListWrapper'
import ListsFooter from '@/components/ListsFooter'
import ListHeader from '@/components/ListHeader'
export default {
  name: 'Board',
  components: {
    ListHeader,
    ListsFooter,
    // ListWrapper,
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
      lastMovedCardId: null,
      lists: this.board.lists.nodes,
      listsDraggable: this.board.lists.nodes.filter(
        (node) => node.name !== 'Inbox'
      ),
      listInbox: this.board.lists.nodes.find((node) => node.name === 'Inbox')
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
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    // eslint-disable-next-line require-await
    async moveList(e) {
      console.log(e)
      if (e.moved) {
        await this.updateListOrder()
      }
    },
    async updateListOrder() {
      const input = {
        lists: this.listsDraggable
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
          },
          refetchQueries: ['boards']
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

<style lang="scss">
$gap: 0.75rem;
$list-header-height: 3rem;
$list-footer-height: 0;
$list-width: 320px;
$scrollbar-thickness: 1rem;

.lists {
  @apply flex overflow-x-auto w-full pl-2;
  > * {
    flex: 0 0 auto; // 'rigid' lists
  }
  &::after {
    content: '';
    flex: 0 0 $gap;
  }
}
.list-last {
  width: $list-width;
}

.list {
  width: $list-width;
  //height: calc(100% - #{$scrollbar-thickness});
  //- #{$gap}

  @apply shadow-lg h-full rounded-t-lg  bg-white;

  > * {
    // background-color: $list-bg-color;
    // color: #333;

    padding: 0 $gap;
  }

  header {
    @apply h-12 border-b rounded-t-lg;
  }

  footer {
    @apply h-12 border-t;
  }

  ul {
    @apply list-none m-0 overflow-y-auto;
    max-height: calc(
      100% - #{$list-header-height}
    ); // - #{$list-footer-height});
    li {
      @apply mt-4;
    }
    li:last-child {
      @apply mb-8;
    }

    // li {
    //   background-color: #fff;
    //   padding: $gap;
    //   &:not(:last-child) {
    //     margin-bottom: $gap;
    //   }

    //   border-radius: $card-border-radius;
    //   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

    //   img {
    //     display: block;
    //     width: calc(100% + 2 * #{$gap});
    //     margin: -$gap 0 $gap (-$gap);
    //     border-top-left-radius: $card-border-radius;
    //     border-top-right-radius: $card-border-radius;
    //   }
    // }
  }
}

.ghost-card {
  @apply border opacity-50 border-black bg-white;
}
.ghost-list {
  @apply border opacity-50 border-black bg-white;
}
</style>
