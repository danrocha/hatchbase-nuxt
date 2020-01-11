<template>
  <div>
    <p class="font-bold">Time for a last check.</p>
    <p class="mb-8">Here is all the information collected in the last steps:</p>
    <div class="flex p-4 mb-4 border rounded">
      <div class="flex-none w-48 mr-4 overflow-hidden">
        <map-single-marker
          :coordinates="location.geometry.location"
          :zoom="16"
        />
      </div>
      <div>
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
            <p>{{ location.formatted_address }}</p>
          </div>

          <p class="mb-2">Is this correct?</p>
          <div class="flex">
            <el-button type="primary" :loading="loading" @click="save"
              >Yes!</el-button
            >
            <button
              class="ml-4 text-gray-600 underline"
              @click="$emit('restart')"
            >
              No, start again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MapSingleMarker from '@/components/MapSingleMarker'
export default {
  name: 'OfficeFormStep3',
  components: {
    MapSingleMarker
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      office: (state) => state.addOffice.office,
      location: (state) => state.addOffice.location,
      card: (state) => state.card.currentCard
    })
  },
  methods: {
    save() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped></style>
