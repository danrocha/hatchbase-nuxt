<template>
  <div>
    <p class="font-bold">First, let's get the correct address.</p>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="Fetching address from Google Maps..."
      class="w-full h-48"
    ></div>
    <div v-else-if="locations.length">
      <p v-if="locations.length === 1" class="mb-8">
        We found this address for {{ card.officeName }}:
      </p>
      <p v-else class="mb-8">
        We found these possible addresses for {{ card.officeName }}. Pick the
        correct one:
      </p>
      <div
        v-for="(location, i) in locations"
        :key="i"
        class="flex p-4 mb-4 border rounded"
      >
        <div class="flex-none w-48 h-48 mr-4 overflow-hidden">
          <map-single-marker
            :coordinates="location.geometry.location"
            :zoom="16"
          />
        </div>
        <div class="flex flex-col justify-between">
          <p>{{ location.formatted_address }}</p>
          <div>
            <p class="mb-2">Is this correct?</p>
            <div class="flex">
              <el-button
                type="primary"
                :loading="loading"
                @click="saveLocation(location)"
                >Yes!</el-button
              >
              <button
                v-if="locations.length === 1"
                class="ml-4 text-gray-600 underline"
              >
                No, add manually
              </button>
            </div>
          </div>
        </div>
      </div>
      <button v-if="locations.length > 1" class="ml-4 text-gray-600 underline">
        The correct address is not listed, add manually.
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MapSingleMarker from '@/components/MapSingleMarker'

export default {
  name: 'OfficeFormStep1',
  components: {
    MapSingleMarker
  },
  computed: {
    ...mapState({
      locations: (state) => state.addOffice.fetchedLocations,
      loading: (state) => state.addOffice.loading,
      card: (state) => state.card.currentCard
    })
  },
  async mounted() {
    if (this.card.officeName) {
      await this['addOffice/fetchAddresses']()
    }
  },
  methods: {
    ...mapActions(['addOffice/fetchAddresses']),
    saveLocation(location) {
      this.$emit('confirm', location)
    }
  }
}
</script>

<style lang="scss" scoped></style>
