<template>
  <div id="card-pane-details">
    <div v-if="!showOfficeForm" id="office-info" class="flex">
      <div class="w-1/2">
        <p v-if="card.officeName" class="text-xl font-bold">
          {{ card.officeName }}
        </p>
        <p v-if="card.city">{{ card.city }}</p>
        <p v-if="card.country">{{ card.country }}</p>
      </div>
      <div v-if="!card.officeId && !showOfficeForm" class="w-1/2 pl-8">
        <p>
          We got some basic data about this company from the job ad, but we can
          do so much more if you add more precise information about it.
        </p>
        <p>
          <button
            class="text-blue-500 underline"
            @click="showOfficeForm = true"
          >
            Let's do it?
          </button>
        </p>
      </div>
    </div>
    <div v-if="showOfficeForm" id="office-info">
      <office-form :card="card" @finished="finishOfficeForm" />
    </div>
  </div>
</template>

<script>
import OfficeForm from '@/components/OfficeForm'
export default {
  components: {
    OfficeForm
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showOfficeForm: false
    }
  },
  methods: {
    finishOfficeForm() {
      this.showOfficeForm = false
    }
  }
}
</script>

<style scoped></style>
