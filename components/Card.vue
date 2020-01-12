<template>
  <card-container :card-id="card.id" :is-new="card.isNew">
    <div @click="openCard">
      <div class="flex items-end mb-4">
        <office-logo
          :office-name="card.officeName"
          :company-logo="card.companyLogo"
          :seed="card.id"
          class="w-12 h-12 mr-2 -mt-4"
        />
        <p v-if="card.officeName" class="text-sm text-gray-600">
          {{ card.officeName }}
        </p>
        <p v-else class="text-sm text-blue-500 underline">Add Office</p>
      </div>
      <div class="mb-4">
        <h2
          class="mb-1 font-sans text-sm font-semibold leading-tight text-gray-700"
        >
          {{ card.title }}
        </h2>
        <p v-if="card.city" class="text-sm text-gray-600">
          in {{ card.city
          }}<span v-if="card.country">, {{ card.country }}</span>
        </p>
        <p v-else class="text-sm text-blue-500 underline">Add location</p>
      </div>
      <div class="flex items-center justify-between mt-4">
        <span class="text-sm text-gray-600">added {{ formattedDate }}</span>
        <badge v-if="card.type" :color="badgeColor">{{ card.type }}</badge>
      </div>
    </div>
  </card-container>
</template>
<script>
import { mapActions } from 'vuex'
import Badge from '@/components/Badge'
import CardContainer from '@/components/CardContainer'
import OfficeLogo from '@/components/OfficeLogo'
import ModalContainer from '@/components/ModalContainer'
export default {
  components: {
    OfficeLogo,
    CardContainer,
    Badge
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
    ...mapActions(['card/setCard', 'card/resetCard', 'addOffice/resetAll']),
    beforeOpen() {
      this['card/setCard'](this.card)
    },
    beforeClose() {
      this['card/resetCard']()
      this['addOffice/resetAll']()
    },
    openCard() {
      this.$modal.show(
        ModalContainer,
        { modalComponent: 'CardDetails', modalProps: { card: this.card } },
        {
          name: 'modal-container',
          adaptive: true,
          width: '90%',
          clickToClose: true,
          height: 'auto',
          scrollable: true
        },
        {
          'before-open': this.beforeOpen,
          'before-close': this.beforeClose
        }
      )
    }
  }
}
</script>
