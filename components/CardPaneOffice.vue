<template>
  <div id="card-pane-details">
    <div v-if="!showOfficeForm" id="office-info">
      <div v-if="!card.officeId">
        <div v-if="card.officeName" class="flex">
          <div class="w-1/2">
            <p v-if="card.officeName" class="text-xl font-bold">
              {{ card.officeName }}
            </p>
            <p v-if="card.city">{{ card.city }}</p>
            <p v-if="card.country">{{ card.country }}</p>
          </div>
          <div class="w-1/2 pl-8">
            <p>
              We got some basic data about this company from the job ad, but we
              can do so much more if you add more precise information about it.
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
        <div v-else>
          <p>
            We could not get any information about the office running this ad.
            However, it is very easy to add it!
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
      <div v-else class="relative">
        <div class="relative z-0 w-full h-48">
          <map-single-marker
            :coordinates="{ lat: card.location.lat, lng: card.location.lng }"
            :zoom="16"
          />
        </div>
        <div class="relative z-10 w-2/3 p-4 mx-4 -mt-8 bg-white rounded shadow">
          <h3 class="mb-2 text-xl font-bold leading-tight">
            {{ card.officeName }}
          </h3>

          <p v-if="card.office.url">
            <i class="mr-2 el-icon-link" /><a
              :href="card.office.url"
              target="_blank"
              class="text-blue-500 underline"
              >{{ card.office.domain }}</a
            >
          </p>
          <p v-if="card.location.formattedAddress">
            <i class="mr-2 el-icon-location-outline" />{{
              card.location.formattedAddress
            }}
          </p>
          <p v-if="card.location.internationalPhoneNumber">
            <i class="mr-2 el-icon-phone-outline" />{{
              card.location.internationalPhoneNumber
            }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="showOfficeForm" id="office-info">
      <office-form @finished="finishOfficeForm" />
    </div>
  </div>
</template>

<script>
import OfficeForm from '@/components/OfficeForm'
import MapSingleMarker from '@/components/MapSingleMarker'
export default {
  components: {
    MapSingleMarker,
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
