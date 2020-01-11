<template>
  <GmapMap
    :center="latLng"
    :zoom="zoom"
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
    <GmapMarker :position="coordinates" :clickable="false" :draggable="false" />
  </GmapMap>
</template>

<script>
import mapStyle from '@/assets/mapStyle.json'

export default {
  name: 'MapSingleMarker',
  props: {
    coordinates: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      mapStyle
    }
  },
  computed: {
    latLng() {
      const coordinates = { ...this.coordinates }
      if (typeof this.coordinates.lat === 'function') {
        coordinates.lat = this.coordinates.lat()
        coordinates.lng = this.coordinates.lng()
      }
      return coordinates
    }
  }
}
</script>

<style lang="scss" scoped></style>
