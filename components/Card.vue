<template>
  <div
    @click="openCard"
    class="px-3 pt-3 pb-5 bg-white border border-white rounded shadow"
  >
    <div class="flex justify-between">
      <p class="font-sans text-sm font-semibold tracking-wide text-gray-700">
        {{ card.name }}
      </p>
      <div class="relative z-10">
        <button
          v-if="isOpen"
          @click="isOpen = false"
          tabindex="-1"
          class="fixed inset-0 w-full h-full cursor-default"
        ></button>
        <button-more-actions @click="isOpen = !isOpen" />
        <div
          v-if="isOpen"
          class="absolute right-0 w-24 py-1 mt-1 text-sm bg-white border border-gray-100 rounded shadow"
        >
          <card-actions>
            <template v-slot="{ deleteCard }">
              <p class="px-2 py-1 hover:bg-yellow-500">
                <button @click="deleteCard(card.id)">Delete</button>
              </p>
            </template>
          </card-actions>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-4">
      <span class="text-sm text-gray-600">{{ formattedDate }}</span>
      <badge v-if="card.type" :color="badgeColor">{{ card.type }}</badge>
    </div>
  </div>
</template>
<script>
import Badge from '@/components/Badge'
import ButtonMoreActions from '@/components/ButtonMoreActions'
import CardActions from '@/components/CardActions'
import CardDetails from '@/components/CardDetails'
export default {
  components: {
    Badge,
    CardActions,
    ButtonMoreActions
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false
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
  },
  methods: {
    openCard() {
      this.$modal.show(
        CardDetails,
        { card: this.card },
        { name: 'card-details', width: '90%', clickToClose: false }
      )
    }
  }
}
</script>
