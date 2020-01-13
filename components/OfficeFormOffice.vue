<template>
  <div>
    <div v-if="office">
      <div class="flex p-4 my-4 border rounded">
        <!-- Pure HTML/JS example -->
        <img :src="office.logoUrl" class="flex-none w-24 h-24 mr-4" />
        <div>
          <div class="mb-8">
            <p class="font-bold">{{ office.name }}</p>
            <p>
              <a
                :href="office.website"
                target="_blank"
                class="text-blue-500 underline"
                >{{ office.domain }}</a
              >
            </p>
            <p>{{ office.international_phone_number }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="manual" class="p-4 my-4 border rounded">
        <form-office-details />
      </div>
      <div v-else>
        <div
          v-if="loading"
          v-loading="loading"
          element-loading-text="Fetching details about the office on Google Places..."
          class="w-full h-48"
        ></div>
        <div v-else-if="fetchedDetails">
          <p class="font-bold">
            Now let's add some extra details about the company.
          </p>
          <p>Here's what we've found:</p>

          <div class="flex p-4 my-4 border rounded">
            <!-- Pure HTML/JS example -->
            <img
              :src="fetchedDetails.logoUrl"
              class="flex-none w-24 h-24 mr-4"
              @error="imgUrlAlt"
            />
            <div>
              <div class="mb-8">
                <p class="font-bold">{{ fetchedDetails.name }}</p>
                <p>
                  <a
                    :href="fetchedDetails.website"
                    target="_blank"
                    class="text-blue-500 underline"
                    >{{ fetchedDetails.domain }}</a
                  >
                </p>
                <p>{{ fetchedDetails.international_phone_number }}</p>
              </div>
              <p class="mb-2">Is this correct?</p>
              <div class="flex">
                <el-button type="primary" :loading="loading" @click="save"
                  >Yes!</el-button
                >
                <button
                  class="ml-4 text-gray-600 underline"
                  @click="manual = true"
                >
                  No, add manually
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormOfficeDetails from '@/components/FormOfficeDetails'

export default {
  name: 'OfficeFormOffice',
  components: {
    FormOfficeDetails
  },
  data() {
    return {
      logoUrl: '',
      manual: false
    }
  },
  computed: {
    ...mapState({
      location: (state) => state.addOffice.location,
      office: (state) => state.addOffice.office,
      fetchedDetails: (state) => state.addOffice.fetchedDetails,
      card: (state) => state.card.currentCard,
      loading: (state) => state.addOffice.loading
    })
  },
  async mounted() {
    if (this.location.place_id && !this.office) {
      await this['addOffice/fetchPlaceDetails'](this.location.place_id)
    }
  },
  methods: {
    ...mapActions(['addOffice/fetchPlaceDetails']),
    save() {
      this.$emit('confirm')
    },
    imgUrlAlt(event) {
      this.details.logoUrl = this.randomLogo
      event.target.src = this.randomLogo
    }
  }
}
</script>

<style lang="scss" scoped></style>
