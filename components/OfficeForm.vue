<template>
  <div class="mb-12">
    <div
      v-if="loading"
      v-loading="loading"
      :element-loading-text="loadingMsg"
      class="w-full h-48"
    ></div>
    <div v-if="step === 1 && locations">
      <p class="font-bold">First, let's get the correct address.</p>
      <p v-if="locations.length === 1">
        We found this address for {{ card.officeName }}:
      </p>
      <div v-for="(location, i) in locations" :key="i" class="flex my-4">
        <div class="flex-none w-48 h-48 mr-4 overflow-hidden">
          <GmapMap
            :center="location.geometry.location"
            :zoom="16"
            style="width: 100%; height: 100%"
            :options="{
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              styles: mapStyle
            }"
          >
            <GmapMarker
              :position="location.geometry.location"
              :clickable="false"
              :draggable="false"
            />
          </GmapMap>
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
              <button class="ml-4 text-gray-600 underline">
                No, add manually
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="step === 2">
      <div v-if="details">
        <p class="font-bold">
          Now let's add some extra details about the company.
        </p>
        <p>Here's what we've found:</p>

        <div class="flex p-4 my-4 border">
          <!-- Pure HTML/JS example -->
          <img
            :src="`https://logo.clearbit.com/${getDomain(details.website)}`"
            class="flex-none w-24 h-24 mr-4"
            @error="imgUrlAlt"
          />
          <div>
            <p class="font-bold">{{ details.name }}</p>
            <p>
              <a
                :href="details.website"
                target="_blank"
                class="text-blue-500 underline"
                >{{ getDomain(details.website) }}</a
              >
            </p>
            <p>{{ details.international_phone_number }}</p>
          </div>
        </div>
        <p class="mb-2">Is this correct?</p>
        <div class="flex">
          <el-button
            type="primary"
            :loading="loading"
            @click="saveLocation(location)"
            >Yes!</el-button
          >
          <button class="ml-4 text-gray-600 underline">
            No, add manually
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import psl from 'psl'
import mapStyle from '@/assets/mapStyle.json'
export default {
  name: 'OfficeForm',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      locations: null,
      loading: false,
      loadingMsg: '',
      mapStyle,
      step: 0,
      details: null
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
      this.loadingMsg = 'Trying to find the address...'

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
    async fetchPlaceDetails(placeId) {
      this.loading = true
      this.loadingMsg = 'Trying to find details about the place...'

      const url = `http://localhost:4000/get-place-details?place_id=${placeId}`
      try {
        const result = await this.$axios.$get(url)
        if (result.status === 'OK') {
          return result
        }
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
        this.step = 1
        this.locations = result.results
      } else if (result.status === 'ZERO_RESULTS') {
        // no results
      }
    },
    async saveLocation(location) {
      this.location = location
      this.step = 2
      if (location.place_id) {
        const { result } = await this.fetchPlaceDetails(location.place_id)
        this.details = result
      }
    },
    getDomain(url) {
      const sourceString = url
        .replace('http://', '')
        .replace('https://', '')
        .split(/[/?#]/)[0]
      const domain = psl.parse(sourceString).domain
      return domain
    },
    imgUrlAlt(event) {
      event.target.src = this.card.companyLogo
    }
  }
}
</script>

<style lang="scss" scoped></style>
