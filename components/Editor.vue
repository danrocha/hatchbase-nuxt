<template>
  <div
    class="bg-white border border-gray-400 rounded editor"
    @click="editor.focus()"
  >
    <editor-menu-bar :editor="editor" class="border-b border-grey-400">
      <div
        slot-scope="{ commands, isActive }"
        class="flex justify-between p-2 bg-white"
      >
        <div class="flex items-center">
          <button
            :class="{ active: isActive.bold() }"
            aria-label="bold"
            class="btn-editor"
            @click.prevent="commands.bold"
          >
            <bold-icon size="1.5x" />
          </button>
          <button
            :class="{ active: isActive.italic() }"
            aria-label="italic"
            class="btn-editor"
            @click.prevent="commands.italic"
          >
            <italic-icon size="1.5x" />
          </button>
          <button
            :class="{ active: isActive.underline() }"
            aria-label="underline"
            class="btn-editor"
            @click.prevent="commands.underline"
          >
            <underline-icon size="1.5x" />
          </button>

          <span class="border-l"></span>
          <button
            :class="{ active: isActive.bullet_list() }"
            aria-label="bullet list"
            class="btn-editor"
            @click.prevent="commands.bullet_list"
          >
            <list-icon size="1.5x" />
          </button>

          <span class="border-l"></span>
          <button
            aria-label="undo"
            class="font-bold btn-editor"
            @click.prevent="commands.undo"
          >
            Undo
          </button>
          <button
            aria-label="redo"
            class="font-bold btn-editor"
            @click.prevent="commands.redo"
          >
            Redo
          </button>
        </div>

        <div v-if="showSave" class="flex">
          <button
            class="mr-4 text-sm text-gray-600 underline"
            @click.stop="$emit('cancel')"
          >
            Cancel
          </button>
          <el-button
            type="primary"
            :loading="loading"
            size="small"
            @click.stop="$emit('save')"
            >Save</el-button
          >
        </div>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" :content="value" class="h-full m-2" />
  </div>
</template>

<script>
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  BulletList,
  ListItem,
  Bold,
  Italic,
  Underline,
  History
} from 'tiptap-extensions'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon
} from 'vue-feather-icons'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    ListIcon
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },

    showSave: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
      autofocus: true,
      extensions: [
        new BulletList(),
        new ListItem(),
        new Bold(),
        new Italic(),
        new Underline(),
        new History()
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        this.$emit('input', getHTML())
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
<style>
.editor {
  min-height: 12em;
}
.btn-editor {
  @apply py-1 px-2 mx-1 rounded text-xs;
}
.btn-editor:hover {
  @apply bg-gray-300;
}
.active {
  @apply bg-gray-400;
}

.ProseMirror:focus {
  @apply outline-none;
}
</style>
