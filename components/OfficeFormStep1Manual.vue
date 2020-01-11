<template>
  <div>
    <p class="mb-4 font-bold">
      First, let's try to find the office on Google Maps.
    </p>
    <div v-if="!placeDetails">
      <p class="mb-2">
        This will help us fill the address and other information automatically.
        What's the name of the office?
      </p>
      <el-input
        ref="autocomplete"
        v-model="city"
        type="text"
        placeholder="Ex.: Zaha Hadid London or Libeskind in NY"
      />
    </div>
    <div v-else>
      <p class="mb-2">This is what you selected:</p>
      <div class="p-2 border rounded">
        <p class="font-bold">{{ placeDetails.name }}</p>
        <p v-if="placeDetails.website">
          <a :href="placeDetails.website" target="_blank">{{
            placeDetails.website
          }}</a>
        </p>
        <p>{{ placeDetails.formatted_address }}</p>
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
</template>

<script>
import { mapState } from 'vuex'
// import MapSingleMarker from '@/components/MapSingleMarker'
export default {
  name: 'OfficeFormStep1Manual',
  components: {
    // MapSingleMarker
  },
  data() {
    return {
      loading: false,
      locations: [],
      city: '',
      autocomplete: null,
      placeDetails: null
    }
  },
  computed: {
    ...mapState({
      card: (state) => state.card.currentCard
    })
  },
  mounted() {
    const input = this.$refs.autocomplete.$el.getElementsByTagName('input')[0]
    const autocomplete = new this.$google.maps.places.Autocomplete(input, {
      types: ['establishment']
    })
    autocomplete.setFields([
      'address_components',
      'formatted_address',
      'geometry.location',
      'name',
      'place_id',
      'website',
      'international_phone_number'
    ])
    autocomplete.addListener('place_changed', () => {
      this.getPlaceDetails()
    })
    this.autocomplete = autocomplete
  },
  methods: {
    save() {
      this.$emit('confirm', this.placeDetails)
    },
    getPlaceDetails() {
      this.placeDetails = this.autocomplete.getPlace()
    }
  }
}
</script>

<style lang="scss" scoped></style>
