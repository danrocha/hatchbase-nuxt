<template>
  <div class="px-2 pb-2 bg-white border border-white rounded shadow">
    <div
      id="card-action"
      class="relative z-10 flex items-center justify-end h-6"
    >
      <div>
        <button-more-actions @click="isOpen = !isOpen" />
        <div
          v-if="isOpen"
          v-click-outside="clickOutside"
          class="absolute right-0 w-24 py-1 mt-1 text-sm bg-white border border-gray-100 rounded shadow "
        >
          <card-actions>
            <template v-slot="{ deleteCard }">
              <p class="px-2 py-1 hover:bg-yellow-500">
                <button @click="deleteCard(cardId)">Delete</button>
              </p>
            </template>
          </card-actions>
          <keyboard-events @keyup="keyboardEvent" />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import KeyboardEvents from '@/components/KeyboardEvents'
import CardActions from '@/components/CardActions'
import ButtonMoreActions from '@/components/ButtonMoreActions'

export default {
  name: 'CardContainer',
  components: {
    CardActions,
    ButtonMoreActions,
    KeyboardEvents
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    cardId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    clickOutside() {
      this.isOpen = false
    },
    keyboardEvent(e) {
      if (e.which === 27) {
        // pressed escape
        this.cancelEditing()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
