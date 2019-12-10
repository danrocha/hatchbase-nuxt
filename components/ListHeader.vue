<template>
  <div class="relative flex justify-between">
    <button
      v-if="editingName"
      @click="editingName = false"
      tabindex="-1"
      class="fixed inset-0 w-full h-full cursor-default"
    ></button>
    <div v-if="editingName" class="z-10">
      <list-actions @success-update="editingName = false">
        <template v-slot="{ updateList }">
          <div>
            <input
              v-model="name"
              @keyup.enter="
                name !== list.name
                  ? updateList(list.id, { name: name })
                  : (editingName = false)
              "
              onfocus="this.select()"
              type="text"
              class="w-full p-1 mr-2 text-sm tracking-wide text-gray-700 border border-yellow-500 rounded focus:outline-none"
              autofocus
            />
            <keyboard-events @keyup="keyboardEvent" />
          </div>
        </template>
      </list-actions>
    </div>
    <button
      v-else
      @click="editingName = true"
      class="text-sm font-semibold tracking-wide text-gray-700 cursor-text"
    >
      {{ name }}
    </button>
    <div class="relative z-10">
      <button-more-actions @click="isOpen = !isOpen" />
      <div
        v-if="isOpen"
        class="absolute right-0 w-24 py-1 mt-1 text-sm bg-white border border-gray-100 rounded shadow"
      >
        <button
          @click="isOpen = false"
          tabindex="-1"
          class="fixed inset-0 w-full h-full cursor-default"
        ></button>
        <list-actions>
          <template v-slot="{ deleteList }">
            <p class="px-2 py-1 hover:bg-yellow-500">
              <button @click="deleteList(list.id)">Delete</button>
            </p>
          </template>
        </list-actions>
        <keyboard-events @keyup="keyboardEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import ListActions from '@/components/ListActions'
import ButtonMoreActions from '@/components/ButtonMoreActions'
import KeyboardEvents from '@/components/KeyboardEvents'

export default {
  name: 'ListHeader',
  components: {
    KeyboardEvents,
    ButtonMoreActions,
    ListActions
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      editingName: false,
      name: this.list.name
    }
  },
  methods: {
    keyboardEvent(e) {
      if (e.which === 27) {
        // pressed escape
        this.name = this.list.name
        this.editingName = false
        this.isOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
