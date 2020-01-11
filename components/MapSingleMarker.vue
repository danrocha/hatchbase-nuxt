<template>
  <div :id="mapDivId" class="w-full h-full" />
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
      mapStyle,
      map: null,
      marker: null
    }
  },
  computed: {
    mapDivId() {
      return `map-${this.center.lat}-${this.center.lng}`
    },
    center() {
      const coordinates = { ...this.coordinates }
      if (typeof this.coordinates.lat === 'function') {
        coordinates.lat = this.coordinates.lat()
        coordinates.lng = this.coordinates.lng()
      }
      return coordinates
    }
  },
  mounted() {
    this.map = this.initMap(this.mapDivId)
    this.marker = this.addMarker(this.center, this.map)
  },
  methods: {
    initMap(mapDivId) {
      const center = this.center
      const zoom = this.zoom
      // The map, centered at Uluru
      const map = new this.$google.maps.Map(document.getElementById(mapDivId), {
        zoom,
        center,
        styles: this.mapStyle
      })
      return map
    },
    addMarker(position, map) {
      // The marker, positioned at Uluru
      const marker = new this.$google.maps.Marker({
        position,
        map
      })
      return marker
    }
  }
}
</script>

<style lang="scss" scoped></style>
