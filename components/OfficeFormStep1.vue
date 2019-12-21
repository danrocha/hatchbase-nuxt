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
import MapSingleMarker from '@/components/MapSingleMarker'
export default {
  name: 'OfficeFormStep1',
  components: {
    MapSingleMarker
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      locations: []
    }
  },
  async mounted() {
    if (this.card.officeName) {
      await this.fetchAddress()
    }
  },
  methods: {
    async fetchAddress() {
      this.loading = true

      let url = `http://localhost:4000/get-address?address=${this.card.officeName}`
      if (this.card.city) url += ` ${this.card.city}`
      if (this.card.country) url += `&country=${this.card.country}`

      try {
        const result = await this.$axios.$get(url)
        this.parseResult(result)
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    parseResult(result) {
      // status codes: https://developers.google.com/maps/documentation/geocoding/intro#StatusCodes
      if (result.status === 'OK') {
        // got results, show
        this.locations = result.results
      } else if (result.status === 'ZERO_RESULTS') {
        // no results
      }
    },
    getAddressObject(location) {
      const ShouldBeComponent = {
        street_number: ['street_number'],
        postal_code: ['postal_code'],
        route: ['street_address', 'route'],
        region: [
          'administrative_area_level_1',
          'administrative_area_level_2',
          'administrative_area_level_3',
          'administrative_area_level_4',
          'administrative_area_level_5'
        ],
        city: [
          'locality',
          'sublocality',
          'sublocality_level_1',
          'sublocality_level_2',
          'sublocality_level_3',
          'sublocality_level_4',
          'postal_town'
        ],
        country: ['country']
      }

      const address = {
        street_number: '',
        postal_code: '',
        route: '',
        region: '',
        city: '',
        country: ''
      }
      location.address_components.forEach((component) => {
        for (const shouldBe in ShouldBeComponent) {
          if (ShouldBeComponent[shouldBe].includes(component.types[0])) {
            if (shouldBe === 'country') {
              address[shouldBe] = component.short_name
            } else {
              address[shouldBe] = component.long_name
            }
          }
        }
      })
      return address
    },
    saveLocation(location) {
      location = { ...location, ...this.getAddressObject(location) }
      this.$emit('confirm', location)
    }
  }
}
</script>

<style lang="scss" scoped></style>
