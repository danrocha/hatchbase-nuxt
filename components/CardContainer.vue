<template>
  <div class="p-2 bg-white shadow-md">
    <slot />
    <div
      id="card-action"
      class="relative z-10 flex items-center justify-between h-8"
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
import {
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
    FileTextIcon
  },

  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
