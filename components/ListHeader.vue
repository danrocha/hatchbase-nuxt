<template>
  <div class="relative flex justify-between h-8 px-2 bg-white shadow-md">
    <button
      v-if="editingName"
      tabindex="-1"
      class="fixed inset-0 w-full h-full cursor-default"
      @click="editingName = false"
    ></button>
    <div v-if="editingName" class="z-10">
      <list-actions @success-update="editingName = false">
        <template v-slot="{ updateList }">
          <div>
            <el-input
              v-model="name"
              onfocus="this.select()"
              type="text"
              class="w-full"
              autofocus
              @keyup.enter="
                name !== list.name
                  ? updateList(list.id, { name: name })
                  : (editingName = false)
              "
            />
            <keyboard-events @keyup="keyboardEvent" />
          </div>
        </template>
      </list-actions>
    </div>
    <button
      v-else
      class="text-sm font-semibold tracking-wide cursor-text"
      @click="editingName = true"
    >
      {{ name }}
    </button>
    <!-- ACTIONS -->
    <div class="flex items-center">
      <span class="mr-2 font-mono text-xs font-bold">{{ numCards }}</span>
      <list-actions>
        <template v-slot="{ remove }">
          <el-dropdown size="mini" type="primary" @command="remove(list.id)">
            <span class="cursor-pointer">
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="delete">Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </list-actions>
    </div>
  </div>
</template>

<script>
import ListActions from '@/components/ListActions'
export default {
  name: 'ListHeader',
  components: {
    ListActions
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editingName: false,
      name: this.list.name
    }
  },
  computed: {
    numCards() {
      return this.list.cards.totalCount
    }
    // isInbox() {
    //   return this.list.name === 'Inbox'
    // }
  }
}
</script>

<style lang="scss" scoped></style>
