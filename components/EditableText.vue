<template>
  <div class="w-full">
    <button v-if="!editing" @click="editing = true" class="cursor-text">
      <slot />
    </button>
    <form v-else-if="editing" @submit.prevent="save">
      <input
        v-click-outside="clickOutside"
        v-model="editText"
        type="text"
        onfocus="this.select()"
        class="w-full p-1 mr-2 tracking-wide text-gray-700 border border-yellow-500 rounded focus:outline-none"
        autofocus
      />
      <keyboard-events @keyup="keyboardEvent" />
    </form>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import KeyboardEvents from '@/components/KeyboardEvents'

export default {
  name: 'EditableText',
  components: {
    KeyboardEvents
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editing: false,
      editText: this.text
    }
  },
  methods: {
    save() {
      if (this.editText !== this.originalText) {
        this.$emit('save', this.editText)
      }
      this.editing = false
    },
    cancelEditing() {
      this.editText = this.text
      this.editing = false
    },
    clickOutside() {
      this.cancelEditing()
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
