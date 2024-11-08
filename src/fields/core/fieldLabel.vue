<template>
  <span
    :id="getFieldID(schema)"
    v-attributes="'label'"
    :class="schema.fieldClasses"
  >
    {{ value }}
  </span>
</template>

<script>
import abstractField from '../abstractField.js'

export default {
  name: 'FieldLabel',
  mixins: [ abstractField ]
}
</script>

<style lang="scss">
.vue-form-generator .field-label span {
	display: block;
	width: 100%;
	margin-left: 12px;
}
</style>
