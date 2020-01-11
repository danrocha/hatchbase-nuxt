<template>
  <div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="Fetching details about the office on Google Places..."
      class="w-full h-48"
    ></div>
    <div v-else-if="office">
      <p class="font-bold">
        Now let's add some extra details about the company.
      </p>
      <p>Here's what we've found:</p>

      <div class="flex p-4 my-4 border rounded">
        <!-- Pure HTML/JS example -->
        <img
          :src="office.logoUrl"
          class="flex-none w-24 h-24 mr-4"
          @error="imgUrlAlt"
        />
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
          <p class="mb-2">Is this correct?</p>
          <div class="flex">
            <el-button type="primary" :loading="loading" @click="save"
              >Yes!</el-button
            >
            <button class="ml-4 text-gray-600 underline">
              No, add manually
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'OfficeFormStep2',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logoUrl: ''
    }
  },
  computed: {
    ...mapState({
      location: (state) => state.addOffice.location,
      office: (state) => state.addOffice.office,
      loading: (state) => state.addOffice.loading
    })
  },
  async mounted() {
    if (this.location.place_id) {
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
