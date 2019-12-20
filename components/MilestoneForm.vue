<template>
  <div>
    <template v-if="showForm">
      <p class="mb-4 font-bold">Add new milestone</p>
      <milestone-actions :card-id="cardId" @success-add="addedCallback">
        <template v-slot="{ create, loading }">
          <form @submit.prevent="create(input)">
            <editor
              v-model="input.milestone.body"
              class="w-full mb-2"
              :show-save="false"
            />
            <!-- <el-input
              type="textarea"
              v-model="input.milestone.body"
              autofocus
              :rows="6"
              class="mb-2"
              :disabled="loading"
            ></el-input> -->
            <el-date-picker
              v-model="input.milestone.date"
              type="datetime"
              placeholder="Select date and time"
              :picker-options="pickerOptions"
              class="mb-2"
              :disabled="loading"
            >
            </el-date-picker>
            <div class="flex mb-8">
              <el-button type="primary" :loading="loading" native-type="submit"
                >Add</el-button
              >
              <button
                class="ml-4 text-gray-600 underline"
                @click="showForm = false"
              >
                Cancel
              </button>
            </div>
          </form>
        </template>
      </milestone-actions>
    </template>
    <template v-else>
      <button class="text-blue-500 underline" @click="showForm = true">
        Add new milestone
      </button>
    </template>
  </div>
</template>

<script>
import MilestoneActions from '@/components/MilestoneActions'
import Editor from '@/components/Editor'
export default {
  name: 'MilestoneForm',
  components: {
    Editor,
    MilestoneActions
  },
  props: {
    cardId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showForm: false,
      input: {
        milestone: { cardId: this.cardId, date: new Date(), body: '' }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    addedCallback() {
      this.$bus.$emit('card-fetch', this.cardId)
      this.input.milestone.body = ''
      this.showForm = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
