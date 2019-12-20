<template>
  <div id="card-pane-milestones">
    <!-- INFO BOX -->
    <preference-actions>
      <template v-slot="{ data, update, loading }">
        <div v-if="!loading">
          <el-alert
            v-if="data.milestonesShowTip"
            title="Milestones"
            type="info"
            close-text="hide"
            description="In this pane you'll record all activities related to this job: sent
        applications, answers received, interviews done. Everything you want to
        record goes here in a easy to follow timeline."
            show-icon
            class="mb-8"
            @close="update(data.id, { milestonesShowTip: false })"
          >
          </el-alert>
        </div>
      </template>
    </preference-actions>

    <div class="flex">
      <div>
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="milestone in card.milestones.nodes"
            :key="milestone.id"
            :type="milestone.type === 'USER' ? 'primary' : ''"
            placement="top"
            :timestamp="
              $dateFns.formatDistanceToNow(new Date(milestone.date), {
                addSuffix: true
              })
            "
          >
            <div
              class="timeline-entry"
              :class="{ 'text-gray-500': milestone.type === 'SYSTEM' }"
              v-html="milestone.body"
            />
            <p v-if="milestone.type === 'USER'" class="text-xs text-gray-500">
              <milestone-actions @success-remove="refetchCard">
                <template v-slot="{ remove }">
                  <button class="underline" @click="remove(milestone.id)">
                    delete
                  </button>
                </template>
              </milestone-actions>
              <!-- |
              <button class="underline">edit</button> -->
            </p>
          </el-timeline-item>
          <el-timeline-item
            icon="el-icon-plus"
            size="large"
            :hide-timestamp="true"
            type="primary"
          >
            <milestone-form :card-id="card.id" />
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import MilestoneForm from '@/components/MilestoneForm'
import PreferenceActions from '@/components/PreferenceActions'
import MilestoneActions from '@/components/MilestoneActions'
export default {
  components: {
    MilestoneActions,
    PreferenceActions,
    MilestoneForm
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    card(newVal, oldVal) {
      console.log('newVal', newVal)
      console.log('oldVal', oldVal)
    }
  },
  methods: {
    refetchCard() {
      this.$bus.$emit('card-fetch', this.card.id)
    }
  }
}
</script>

<style scoped>
#card-pane-milestones {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
}
</style>
