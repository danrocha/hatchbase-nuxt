<template>
  <div>
    <button v-if="!editing" class="cursor-text" @click="editing = true">
      <slot />
    </button>
    <form v-else-if="editing" @submit.prevent="save">
      <el-input
        v-if="fieldType === 'input'"
        v-model="editText"
        v-click-outside="clickOutside"
        :size="size"
        type="text"
        onfocus="this.select()"
        autofocus
        :disabled="loading"
      />
      <el-date-picker
        v-else-if="fieldType === 'date'"
        v-model="editText"
        v-click-outside="clickOutside"
        type="date"
        :size="size"
        placeholder="Select date"
        :disabled="loading"
        @change="save"
      >
      </el-date-picker>
      <div v-else-if="fieldType === 'textarea'" v-click-outside="clickOutside">
        <el-input
          v-model="editText"
          type="textarea"
          onfocus="this.select()"
          autofocus
          :disabled="loading"
          class="mb-2"
        />
        <div class="flex mb-2">
          <el-button
            type="primary"
            :loading="loading"
            native-type="submit"
            size="small"
            >Save</el-button
          >
          <button
            class="ml-4 text-sm text-gray-600 underline"
            @click="cancelEditing"
          >
            Cancel
          </button>
        </div>
      </div>
      <div v-else-if="fieldType === 'editor'" v-click-outside="clickOutside">
        <editor
          v-model="editText"
          :loading="loading"
          @cancel="cancelEditing"
          @save="save"
        />
      </div>
      <keyboard-events @keyup="keyboardEvent" />
    </form>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import KeyboardEvents from '@/components/KeyboardEvents'
import Editor from '@/components/Editor'

export default {
  name: 'EditableText',
  components: {
    Editor,
    KeyboardEvents
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    fieldType: {
      type: String,
      default: 'input'
    },
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    loading: {
      type: Boolean,
      default: false
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
      this.save()
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
