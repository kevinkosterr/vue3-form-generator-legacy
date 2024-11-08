<template>
  <input
    :id="getFieldID(schema)"
    v-model="value"
    v-attributes="'input'"
    type="checkbox"
    :autocomplete="schema.autocomplete"
    :disabled="disabled || null"
    :name="schema.inputName"
    :class="schema.fieldClasses"
    :required="schema.required"
  >
</template>

<script>
import abstractField from '../abstractField.js'

export default {
  name: 'FieldCheckbox',
  mixins: [ abstractField ]
}
</script>

<style lang="scss">
.vue-form-generator .field-checkbox input {
	margin-left: 12px;
}
</style>
