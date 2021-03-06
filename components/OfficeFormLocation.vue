<template>
  <div>
    <!-- ALREADY HAS LOCATION, SHOW IT -->
    <div v-if="location">
      <div class="flex p-4 mb-4 border rounded">
        <div class="flex-none w-48 h-48 mr-4 overflow-hidden">
          <map-single-marker
            :coordinates="location.geometry.location"
            :zoom="16"
          />
        </div>
        <div class="flex flex-col justify-between">
          <p>{{ location.formatted_address }}</p>
        </div>
      </div>
    </div>
    <!-- NO LOCATION SELECTED YET, FETCH -->
    <div v-else>
      <p class="font-bold">First, let's get the correct address.</p>
      <div v-if="!manual">
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
            We found these possible addresses for {{ card.officeName }}. Pick
            the correct one:
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
              <p v-if="location.name" class="font-bold">{{ location.name }}</p>
              <p>{{ location.formatted_address }}</p>
              <div v-if="locations.length === 1">
                <p class="mb-2">Is this correct?</p>

                <el-button
                  type="primary"
                  :loading="loading"
                  @click="saveLocation(location)"
                  >Yes!</el-button
                >
                <button class="text-blue-500 underline" @click="manual = true">
                  No, add manually
                </button>
              </div>
              <div v-else>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="saveLocation(location)"
                  >Pick this one</el-button
                >
              </div>
            </div>
          </div>
          <button
            v-if="locations.length > 1"
            class="text-blue-500 underline"
            @click="manual = true"
          >
            The correct address is not listed, add manually.
          </button>
        </div>
      </div>
      <!-- NOT FOUND IN FETCH< ADD MANUAL -->
      <div v-else-if="manual">
        <form-location />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MapSingleMarker from '@/components/MapSingleMarker'
import FormLocation from '@/components/FormLocation'

export default {
  name: 'OfficeFormLocation',
  components: {
    FormLocation,
    MapSingleMarker
  },
  data() {
    return {
      manual: false
    }
  },
  computed: {
    ...mapState({
      locations: (state) => state.addOffice.fetchedLocations,
      location: (state) => state.addOffice.location,
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
      return this.$emit('confirm', location)
    }
  }
}
</script>

<style lang="scss" scoped></style>
