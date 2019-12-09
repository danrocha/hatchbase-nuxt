<template>
  <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
  <draggable
    :list="cards"
    :animation="200"
    :move="update"
    draggable=".card"
    ghost-class="ghost-card"
    group="cards"
  >
    <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
    <card
      v-for="card in cards"
      :key="card.id"
      :card="card"
      class="mt-3 cursor-move card"
    />
    <div
      slot="footer"
      role="group"
      class="px-3 pt-3 pb-5 mt-3 bg-white border border-white rounded opacity-50"
    >
      <div class="flex justify-center">
        <button
          class="flex items-center justify-center w-12 h-12 text-lg font-bold border rounded-full"
        >
          +
        </button>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import Card from '@/components/Card'
export default {
  name: 'Cards',
  components: {
    draggable,
    Card
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    cardsList: {
      get() {
        return this.cards
      },
      set(value) {
        // console.log(value)
      }
    }
  },
  methods: {
    update(evt, originalEvent) {
      console.log(evt.draggedContext)
      console.log(evt.relatedContext)
    }
  }
}
</script>

<style scoped>
.ghost-card {
  @apply border opacity-50 border-blue-500 bg-gray-200;
}
</style>
