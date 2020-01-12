<template>
  <el-form @submit.native.prevent>
    <el-form-item label="First, the office is in which city?">
      <el-input
        ref="autocomplete"
        v-model="cityInput"
        placeholder="eg. 'London'"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FormCity',
  data() {
    return {
      cityInput: '',
      autcomplete: null
    }
  },

  mounted() {
    const input = this.$refs.autocomplete.$el.getElementsByTagName('input')[0]
    const autocomplete = new this.$google.maps.places.Autocomplete(input, {
      types: ['(cities)']
    })
    autocomplete.setFields(['address_components', 'geometry'])
    autocomplete.addListener('place_changed', () => {
      this.setCity()
    })
    this.autocomplete = autocomplete
  },
  methods: {
    ...mapActions(['addOffice/setCity']),
    setCity() {
      const place = this.autocomplete.getPlace()
      this['addOffice/setCity'](place)
    }
  }
}
</script>
