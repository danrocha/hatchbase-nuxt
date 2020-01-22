<template>
  <div id="card-pane-details" class="h-full mb-12">
    <div
      id="posted-on"
      class="flex justify-between py-2 text-xs text-sm text-gray-600"
    >
      <editable-text
        :text="card.postedOn"
        :loading="localLoading"
        field-type="date"
        @save="update(card.id, { postedOn: $event })"
      >
        <p v-if="card.postedOn">
          Originally posted on
          {{
            $dateFns.isDate(new Date(card.postedOn))
              ? $dateFns.format(new Date(card.postedOn), 'MMMM do')
              : card.postedOn
          }}
          <i class="el-icon-date"></i>
        </p>
        <p v-else class="text-blue-500 underline">
          Add original post date <i class="el-icon-date" />
        </p>
      </editable-text>
    </div>

    <card-detail-field
      id="job-title"
      field-name="Job Title"
      :text="card.jobTitle"
      :loading="localLoading"
      @save="update(card.id, { jobTitle: $event })"
    />
    <card-detail-field
      id="job-type"
      field-name="Contract type"
      :text="card.jobType"
      :loading="localLoading"
      @save="update(card.id, { jobType: $event })"
    />

    <card-detail-field
      id="start-date"
      field-type="date"
      field-name="Starting date"
      :text="card.startDate"
      :loading="localLoading"
      @save="update(card.id, { startDate: $event })"
    />
    <card-detail-field
      id="salary"
      field-name="Salary"
      :text="card.salary"
      :loading="localLoading"
      @save="update(card.id, { salary: $event })"
    />

    <card-detail-field
      id="description-html"
      field-name="Description"
      :text="card.descriptionHtml"
      :loading="localLoading"
      field-type="editor"
      @save="update(card.id, { descriptionHtml: $event })"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CardDetailField from '@/components/CardDetailField'
import EditableText from '@/components/EditableText'
export default {
  components: {
    EditableText,
    CardDetailField
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      localLoading: (state) => state.board.localLoading
    })
  },
  methods: {
    ...mapActions(['card/cardTransition']),
    update(id, patch) {
      this['card/cardTransition']({
        type: 'UPDATE_CARD',
        params: { id, patch }
      })
    }
  }
}
</script>

<style scoped>
#card-pane-details {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-template-areas:
    'posted-on'
    'job-title'
    'job-type'
    'start-date'
    'salary'
    'description-html';
}

@screen sm {
  #card-pane-details {
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: repeat(4, 1fr);
    grid-template-areas:
      'posted-on posted-on'
      'job-title job-type'
      'start-date salary'
      'description-html description-html';
  }
}

#job-title {
  grid-area: job-title;
}
#job-type {
  grid-area: job-type;
}
#start-date {
  grid-area: start-date;
}
#salary {
  grid-area: salary;
}
#posted-on {
  grid-area: posted-on;
}
#description-html {
  grid-area: description-html;
}
</style>
