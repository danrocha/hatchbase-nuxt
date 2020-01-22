<template>
  <board-actions :query="true">
    <template v-slot="{ loading, data }">
      <p v-if="loading">Loading...</p>
      <template v-else>
        <board v-for="board in data.nodes" :key="board.id" :board="board" />
      </template>
    </template>
  </board-actions>
</template>

<script>
import Board from '@/components/Board'
import BoardActions from '@/components/BoardActions'
export default {
  name: 'App',
  components: {
    BoardActions,
    Board
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
