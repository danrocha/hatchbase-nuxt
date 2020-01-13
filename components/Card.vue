<template>
  <card-container :card="card">
    <div class="flex" @click="openCard">
      <office-logo
        :office-name="card.officeName"
        :company-logo="card.companyLogo"
        :seed="card.id"
        class="flex-none w-16 h-16"
      />
      <div class="pl-4">
        <h2 class="mb-1 font-bold leading-tight">
          {{ card.title }}
        </h2>
        <div class="mb-1">
          <p v-if="card.officeName" class="leading-tight">
            at {{ card.officeName }}
          </p>
          <p v-else class="text-sm text-blue-500 underline">Add Office</p>
        </div>

        <div class="mb-4">
          <p v-if="card.city" class="leading-tight text-gray-600">
            in {{ card.city
            }}<span v-if="card.country">, {{ card.country }}</span>
          </p>
          <p v-else class="text-sm text-blue-500 underline">Add location</p>
        </div>

        <p class="flex items-center mb-4 text-sm text-gray-600 ">
          <alert-triangle-icon
            v-if="isOld"
            size="1x"
            class="mr-1"
          ></alert-triangle-icon>
          <clock-icon v-else size="1x" class="mr-1"></clock-icon>added
          {{ formattedDate }}
        </p>
      </div>
    </div>
  </card-container>
</template>
<script>
import { mapActions } from 'vuex'
import { ClockIcon, AlertTriangleIcon } from 'vue-feather-icons'
import CardContainer from '@/components/CardContainer'
import OfficeLogo from '@/components/OfficeLogo'
import ModalContainer from '@/components/ModalContainer'

export default {
  components: {
    OfficeLogo,
    CardContainer,
    ClockIcon,
    AlertTriangleIcon
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
  computed: {
    formattedDate() {
      const createdAt = this.createdAt
      if (this.$dateFns.isThisWeek(createdAt)) {
        return this.$dateFns.formatDistanceToNow(
          new Date(this.card.createdAt),
          {
            addSuffix: true
          }
        )
      }
      return this.$dateFns.format(createdAt, 'LLL do')
    },
    isOld() {
      return (
        this.$dateFns.differenceInCalendarWeeks(new Date(), this.createdAt) >= 3
      )
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
