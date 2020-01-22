<template>
  <app-main-layout>
    <template #top-bar>
      jobs top bar
    </template>
    <template #content>
      <p v-if="globalLoading || !board">Loading...</p>
      <kanban-board v-else :board="board" />
    </template>
  </app-main-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppMainLayout from '@/components/AppMainLayout'
import KanbanBoard from '@/components/KanbanBoard'
export default {
  components: {
    AppMainLayout,
    KanbanBoard
  },
  data() {
    return {
      show: 'board'
    }
  },
  computed: {
    ...mapState({
      board: (state) => state.board.board,
      card: (state) => state.card.currentCard,
      showCard: (state) => state.card.showCard,
      globalLoading: (state) => state.board.globalLoading
    })
  },
  watch: {
    showCard(newVal, oldVal) {
      if (newVal && this.card.id)
        return this.$router.push(`/home/jobs/card/${this.card.id}`)
    }
  },
  mounted() {
    if (this.showCard) {
      this['card/cardTransition']({
        type: 'HIDE_CARD'
      })
    }
    if (!this.board) {
      this['board/boardTransition']({
        type: 'FETCH_BOARD'
      })
    }
  },
  methods: {
    ...mapActions(['board/boardTransition', 'card/cardTransition'])
  }
}
</script>

<style lang="scss" scoped></style>
