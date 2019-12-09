<template>
  <div class="px-3 pt-3 pb-5 bg-white border border-white rounded shadow">
    <div class="flex justify-between">
      <p class="font-sans text-sm font-semibold tracking-wide text-gray-700">
        {{ card.name }}
      </p>

      <img
        class="w-6 h-6 ml-3 rounded-full"
        src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        alt="Avatar"
      />
    </div>
    <div class="flex items-center justify-between mt-4">
      <span class="text-sm text-gray-600">{{ formattedDate }}</span>
      <badge v-if="card.type" :color="badgeColor">{{ card.type }}</badge>
    </div>
  </div>
</template>
<script>
import Badge from '@/components/Badge.vue'
export default {
  components: {
    Badge
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formattedDate() {
      const cardDate = new Date(this.card.createdAt)
      if (this.$dateFns.isThisWeek(cardDate)) {
        return this.$dateFns.formatDistanceToNow(
          new Date(this.card.createdAt),
          {
            addSuffix: true
          }
        )
      }
      return this.$dateFns.format(cardDate, 'LLL do')
    },
    badgeColor() {
      const mappings = {
        Design: 'purple',
        'Feature Request': 'teal',
        Backend: 'blue',
        QA: 'green',
        default: 'teal'
      }
      return mappings[this.card.type] || mappings.default
    }
  }
}
</script>
