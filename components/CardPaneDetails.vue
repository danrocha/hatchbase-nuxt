<template>
  <card-actions @success-update="successUpdate">
    <template v-slot="{ loading, update }">
      <div id="card-pane-details">
        <div
          id="posted-on"
          class="flex justify-between py-2 text-xs text-sm text-gray-600 border-t border-black"
        >
          <p>
            <a
              :href="card.url"
              target="_blank"
              class="underline"
              :alt="card.url"
              >Original URL
            </a>
            <i class="el-icon-link" />
          </p>

          <editable-text
            :text="card.postedOn"
            :loading="loading"
            field-type="date"
            @save="update(card.id, { postedOn: $event })"
          >
            <!-- <p v-if="card.postedOn">
              Originally posted on
              {{ card.postedOn }}
              <i class="el-icon-date"></i>
            </p> -->
            <p v-if="card.postedOn">
              Originally posted on
              {{
                $dateFns.isDate(new Date(card.postedOn))
                  ? $dateFns.format(card.postedOn, 'MMMM do')
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
          :loading="loading"
          @save="update(card.id, { jobTitle: $event })"
        />
        <card-detail-field
          id="job-type"
          field-name="Contract type"
          :text="card.jobType"
          :loading="loading"
          @save="update(card.id, { jobType: $event })"
        />

        <card-detail-field
          id="start-date"
          field-type="date"
          field-name="Starting date"
          :text="card.startDate"
          :loading="loading"
          @save="update(card.id, { startDate: $event })"
        />
        <card-detail-field
          id="salary"
          field-name="Salary"
          :text="card.salary"
          :loading="loading"
          @save="update(card.id, { salary: $event })"
        />
        <card-detail-field
          id="notes"
          field-name="Notes"
          :text="card.notes"
          :loading="loading"
          field-type="textarea"
          @save="update(card.id, { notes: $event })"
        />
        <card-detail-field
          id="description-html"
          field-name="Description"
          :text="card.descriptionHtml"
          :loading="loading"
          field-type="editor"
          @save="update(card.id, { descriptionHtml: $event })"
        />
        <!--
        <div id="description-html">
          <p
            class="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase"
          >
            Description
          </p>
          <div
            v-if="card.descriptionHtml"
            class="p-2 border border-black rounded sm:p-4 html-description"
            v-html="card.descriptionHtml"
          />

        </div> -->
      </div>
    </template>
  </card-actions>
</template>

<script>
import CardActions from '@/components/CardActions'
import CardDetailField from '@/components/CardDetailField'
import EditableText from '@/components/EditableText'
export default {
  components: {
    EditableText,
    CardDetailField,
    CardActions
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    successUpdate() {
      this.$bus.$emit('card-fetch', this.card.id)
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
    'notes'
    'description-html';
}

@screen sm {
  #card-pane-details {
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-template-areas:
      'posted-on posted-on'
      'job-title job-type'
      'start-date salary'
      'notes notes'
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
#notes {
  grid-area: notes;
}
#posted-on {
  grid-area: posted-on;
}
#description-html {
  grid-area: description-html;
}
</style>
