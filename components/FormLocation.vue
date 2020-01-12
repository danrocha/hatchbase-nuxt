<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <form-city v-if="!city" key="form" />
      <p v-else key="city">
        <i class="mr-2 el-icon-location-outline" /> {{ city.city }},
        {{ city.country }}
      </p>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <form-establishment v-if="city && !location && !office" key="form" />
      <p v-else-if="office && location" key="office">
        <i class="mr-2 el-icon-location-outline" /> {{ office.name }},
        {{ office.formatted_address }}
      </p>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormCity from '@/components/FormCity'
import FormEstablishment from '@/components/FormEstablishment'
export default {
  name: 'FormLocation',
  components: {
    FormEstablishment,
    FormCity
  },
  data() {
    return {
      step: 0
    }
  },
  computed: {
    ...mapState({
      card: (state) => state.card.currentCard,
      city: (state) => state.addOffice.city,
      location: (state) => state.addOffice.location,
      office: (state) => state.addOffice.office
    })
  }
}
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
