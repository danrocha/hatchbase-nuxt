<template>
  <div class="px-2 pb-2 bg-white rounded shadow">
    <div
      id="card-action"
      class="relative z-10 flex items-center justify-end h-6"
    >
      <div>
        <card-actions>
          <template v-slot="{ deleteCard }">
            <el-dropdown
              size="mini"
              type="primary"
              @command="deleteCard(cardId)"
            >
              <span class="cursor-pointer">
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete"> Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </card-actions>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import CardActions from '@/components/CardActions'

export default {
  name: 'CardContainer',
  components: {
    CardActions
  },

  props: {
    cardId: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
