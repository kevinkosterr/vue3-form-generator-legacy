<template>
  <textarea
    :id="getFieldID(schema)"
    v-model="value"
    v-attributes="'input'"
    class="form-control"
    :class="schema.fieldClasses"
    :disabled="disabled || null"
    :maxlength="schema.max"
    :minlength="schema.min"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    :required="schema.required"
    :rows="schema.rows || 2"
    :name="schema.inputName"
    @blur="onBlur"
  />
</template>


<script>
import abstractField from '../abstractField.js'

export default {
  name: 'FieldTextArea',
  mixins: [ abstractField ],
  methods: {
    onBlur (e) {
      this.$emit('blur', e.target.value, this.schema.model)
    }
  }
}
</script>


<style lang="scss">

</style>
