<template>
  <div class="bg-white border border-gray-400 rounded editor">
    <editor-menu-bar :editor="editor" class="border-b border-grey-400">
      <div slot-scope="{ commands, isActive }" class="py-2 bg-white">
        <button
          :class="{ active: isActive.bold() }"
          @click.prevent="commands.bold"
          aria-label="bold"
          class="btn-editor"
        >
          <bold-icon />
        </button>
        <button
          :class="{ active: isActive.italic() }"
          @click.prevent="commands.italic"
          aria-label="italic"
          class="btn-editor"
        >
          <italic-icon />
        </button>
        <button
          :class="{ active: isActive.underline() }"
          @click.prevent="commands.underline"
          aria-label="underline"
          class="btn-editor"
        >
          <underline-icon />
        </button>

        <span class="border-l"></span>
        <button
          :class="{ active: isActive.bullet_list() }"
          @click.prevent="commands.bullet_list"
          aria-label="bullet list"
          class="btn-editor"
        >
          <list-icon />
        </button>

        <span class="border-l"></span>
        <button
          @click.prevent="commands.undo"
          aria-label="undo"
          class="btn-editor"
        >
          Undo
        </button>
        <button
          @click.prevent="commands.redo"
          aria-label="redo"
          class="btn-editor"
        >
          Redo
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" :content="value" class="m-2" />
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
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
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
<style scoped>
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
</style>
