<template>
  <el-form @submit.native.prevent>
    <el-form-item label="Now search for the office to find its address:">
      <el-input
        ref="autocomplete"
        v-model="input"
        placeholder="eg. 'Zaha Hadid'"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'FormEstablishment',
  data() {
    return {
      input: '',
      autocomplete: null
    }
  },
  computed: {
    ...mapState({
      city: (state) => state.addOffice.city
    })
  },
  mounted() {
    const bounds = this.city.geometry.viewport || null
    const componentRestrictions = { country: this.city.country.toLowerCase() }
    const input = this.$refs.autocomplete.$el.getElementsByTagName('input')[0]
    const autocomplete = new this.$google.maps.places.Autocomplete(input, {
      types: ['establishment'],
      bounds,
      componentRestrictions
    })
    autocomplete.setFields([
      'name',
      'website',
      'international_phone_number',
      'address_components',
      'geometry.location',
      'formatted_address',
      'place_id'
    ])

    autocomplete.addListener('place_changed', () => {
      this.setOfficeAndLocation()
    })
    this.autocomplete = autocomplete
  },
  methods: {
    ...mapActions(['addOffice/setLocation', 'addOffice/setOffice']),
    setOfficeAndLocation() {
      const place = this.autocomplete.getPlace()
      this['addOffice/setLocation'](place)
      this['addOffice/setOffice'](place)
    }
  }
}
</script>
