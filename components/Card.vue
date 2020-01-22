<template>
  <card-container :card="card">
    <h2 class="mb-4 font-bold leading-tight">
      {{ card.title }}
    </h2>
    <div class="flex items-center mb-4">
      <office-logo
        :office-name="card.officeName"
        :company-logo="card.companyLogo"
        :seed="card.id"
        class="flex-none w-12 h-12 overflow-hidden border-2 border-white rounded-full shadow"
      />
      <div class="pl-4">
        <div class="mb-1">
          <p v-if="card.officeName" class="leading-tight">
            at {{ card.officeName }}
          </p>
          <p v-else class="text-sm text-blue-500 underline">Add Office</p>
        </div>

        <div>
          <p v-if="card.city" class="leading-tight text-gray-600">
            in {{ card.city
            }}<span v-if="card.country">, {{ card.country }}</span>
          </p>
          <p v-else class="text-sm text-blue-500 underline">Add location</p>
        </div>
      </div>
    </div>
  </card-container>
</template>
<script>
import { mapActions } from 'vuex'

import CardContainer from '@/components/CardContainer'
import OfficeLogo from '@/components/OfficeLogo'
import ModalContainer from '@/components/ModalContainer'

export default {
  components: {
    OfficeLogo,
    CardContainer
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false,
      createdAt: new Date(this.card.createdAt),
      updatedAt: new Date(this.card.updatedAt)
    }
  },
  computed: {},
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
