<template>
  <div class="bg-white border rounded shadow">
    <div class="px-4 pt-4" @click="showCard(card)"><slot /></div>
    <div
      id="card-action"
      class="relative z-10 flex items-center justify-between px-4 py-2 border-t"
    >
      <div class="flex items-center">
        <div class="mr-2">
          <heart-icon size="1x" class="text-gray-600"></heart-icon>
        </div>
        <div class="mr-2">
          <coffee-icon size="1x" class="text-gray-600"></coffee-icon>
        </div>
        <div class="mr-2">
          <file-text-icon size="1x" class="text-gray-600"></file-text-icon>
        </div>
        <div
          v-if="card.isNew"
          class="px-2 mr-2 text-xs font-semibold text-yellow-100 bg-yellow-500 rounded-full"
        >
          new
        </div>
        <div v-else>
          <p class="flex items-center text-sm text-gray-600 ">
            <alert-triangle-icon
              v-if="isOld"
              size="1x"
              class="mr-1 text-gray-600"
            ></alert-triangle-icon>
            <clock-icon
              v-else
              size="1x"
              class="mr-1 text-gray-600"
            ></clock-icon>
            {{ formattedDate }}
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <card-actions>
          <template v-slot="{ deleteCard }">
            <el-dropdown
              size="mini"
              type="primary"
              trigger="click"
              @command="deleteCard(card.id)"
            >
              <span class="w-8 h-full">
                <chevron-down-icon size="1.5x"></chevron-down-icon>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete"> Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </card-actions>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  ClockIcon,
  AlertTriangleIcon,
  ChevronDownIcon,
  HeartIcon,
  CoffeeIcon,
  FileTextIcon
} from 'vue-feather-icons'
import CardActions from '@/components/CardActions'

export default {
  name: 'CardContainer',
  components: {
    CardActions,
    ChevronDownIcon,
    HeartIcon,
    CoffeeIcon,
    FileTextIcon,
    ClockIcon,
    AlertTriangleIcon
  },

  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
    ...mapActions(['card/cardTransition']),
    showCard(card) {
      this['card/cardTransition']({
        type: 'FETCH_CARD',
        params: { id: card.id }
      })
    }
  }
}
</script>

<style lang="scss"></style>
