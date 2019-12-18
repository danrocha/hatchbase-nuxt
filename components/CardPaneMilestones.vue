<template>
  <div id="card-pane-milestones">
    <!-- INFO BOX -->
    <preference-actions>
      <template v-slot="{ data, update, loading }">
        <div v-if="!loading && data.milestonesShowTip" class="mb-8">
          <el-alert
            title="Milestones"
            type="info"
            close-text="hide"
            description="In this pane you'll record all activities related to this job: sent
        applications, answers received, interviews done. Everything you want to
        record goes here in a easy to follow timeline."
            show-icon
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
export default {
  components: {
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
