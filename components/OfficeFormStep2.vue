<template>
  <div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="Fetching details about the office on Google Places..."
      class="w-full h-48"
    ></div>
    <div v-else-if="details">
      <p class="font-bold">
        Now let's add some extra details about the company.
      </p>
      <p>Here's what we've found:</p>

      <div class="flex p-4 my-4 border rounded">
        <!-- Pure HTML/JS example -->
        <img
          :src="details.logoUrl"
          class="flex-none w-24 h-24 mr-4"
          @error="imgUrlAlt"
        />
        <div>
          <div class="mb-8">
            <p class="font-bold">{{ details.name }}</p>
            <p>
              <a
                :href="details.website"
                target="_blank"
                class="text-blue-500 underline"
                >{{ details.domain }}</a
              >
            </p>
            <p>{{ details.international_phone_number }}</p>
          </div>
          <p class="mb-2">Is this correct?</p>
          <div class="flex">
            <el-button type="primary" :loading="loading" @click="save(details)"
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
import psl from 'psl'

export default {
  name: 'OfficeFormStep2',
  props: {
    card: {
      type: Object,
      required: true
    },
    location: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      office: null,
      details: null,
      logoUrl: ''
    }
  },
  computed: {
    randomLogo() {
      return `https://avatars.dicebear.com/v2/initials/${this.card.officeName}.svg`
    }
  },
  async mounted() {
    if (this.location.place_id) {
      const result = await this.fetchPlaceDetails(this.location.place_id)
      this.details = this.processResults(result)
    }
  },
  methods: {
    async fetchPlaceDetails(placeId) {
      this.loading = true
      const url = `http://localhost:4000/get-place-details?place_id=${placeId}`
      try {
        const result = await this.$axios.$get(url)
        return result
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    processResults(details) {
      if (details.status !== 'OK') return null
      const { result } = details
      if (result.website) {
        result.domain = this.getDomain(result.website)
      }
      result.logoUrl = this.setLogoUrl(result.domain)
      return result
    },
    setLogoUrl(domain = null) {
      if (this.card.companyLogo) return this.card.companyLogo
      if (domain) return `https://logo.clearbit.com/${domain}`
      return this.randomLogo
    },
    save(details) {
      this.$emit('confirm', details)
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
      this.details.logoUrl = this.randomLogo
      event.target.src = this.randomLogo
    }
  }
}
</script>

<style lang="scss" scoped></style>
