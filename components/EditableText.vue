<template>
  <div class="w-full">
    <button v-if="!editing" class="cursor-text" @click="editing = true">
      <slot />
    </button>
    <form v-else-if="editing" @submit.prevent="save">
      <el-input
        v-model="editText"
        v-click-outside="clickOutside"
        type="text"
        size="large"
        onfocus="this.select()"
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
