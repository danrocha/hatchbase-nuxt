<template>
  <div>
    <p class="text-xs font-bold tracking-wide text-gray-500 uppercase">
      {{ fieldName }}
    </p>
    <editable-text
      :text="text"
      :loading="loading"
      :field-type="fieldType"
      @save="$emit('save', $event)"
    >
      <div
        v-if="text && fieldType === 'editor'"
        class="w-full p-2 border border-black rounded sm:p-4 html-description"
        v-html="text"
      />
      <p v-else-if="text">
        {{ fieldType === 'date' ? $dateFns.format(text, 'MMMM do') : text }}
      </p>
      <p v-else class="text-blue-500 underline">
        Add {{ fieldName.toLowerCase() }}
      </p>
    </editable-text>
  </div>
</template>

<script>
import EditableText from '@/components/EditableText'

export default {
  components: {
    EditableText
  },
  props: {
    fieldName: {
      type: String,
      default: ''
    },
    fieldType: {
      type: String,
      default: 'input'
    },
    text: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
