<template>
  <img :src="mapLink">
</template>


<script>
import abstractField from '../abstractField.js'
import { defaults } from 'lodash'

export default {
  name: 'FieldStaticMap',
  mixins: [ abstractField ],
  computed: {
    mapLink() {
      if (this.value) {
        let lat, lng
        let options = defaults(this.schema.staticMapOptions || {}, {
          lat: 'lat',
          lng: 'lng',
          zoom: 8,
          sizeX: 640,
          sizeY: 640
        })

        lat = this.value[options.lat]
        lng = this.value[options.lng]

        let url = `http://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${options.zoom}&size=${options.sizeX}x${options.sizeY}`

        let props = [ 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'key', 'signature' ]
        for (let prop of props) {
          if (typeof options[prop] !== 'undefined') {
            url += `&${prop}=${options[prop]}`
          }
        }
        if (lat && lng) {
          return url
        }
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
.vue-form-generator .field-staticMap img {
	display: block;
	width: auto;
	max-width: 100%;
}
</style>
