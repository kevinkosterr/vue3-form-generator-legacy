<template>
  <input
    :id="getFieldID(schema)"
    class="form-control"
    type="text"
    :value="value"
    :autocomplete="schema.autocomplete"
    :disabled="disabled || null"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    :name="schema.inputName"
  >
</template>


<script>
import abstractField from '../abstractField.js'
import { defaults } from 'lodash'

export default {
  name: 'FieldCleave',
  mixins: [ abstractField ],
  data() {
    return {
      cleave: null
    }
  },

  mounted() {
    this.$nextTick(function() {
      if (window.Cleave) {
        this.cleave = new window.Cleave(
          this.$el,
          defaults(this.schema.cleaveOptions || {}, {
            // Credit Card
            creditCard: false,
            // onCreditCardTypeChanged: onCreditCardTypeChanged.bind(this),
            // Phone
            phone: false,
            phoneRegionCode: 'AU',
            // Date
            date: false,
            datePattern: [ 'd', 'm', 'Y' ],
            // Numerals
            numeral: false,
            numeralThousandsGroupStyle: 'thousand',
            numeralDecimalScale: 2,
            numeralDecimalMark: '.',
            // General
            blocks: [],
            delimiter: ' ',
            prefix: null,
            numericOnly: false,
            uppercase: false,
            lowercase: false,
            maxLength: 0
          })
        )

        if (this.cleave.properties && this.cleave.properties.hasOwnProperty('result')) {
          this.$watch('cleave.properties.result', () => {
            this.value = this.cleave.properties.result
          })
        } else {
          this.$el.addEventListener('input', this.inputChange)
        }
      } else {
        console.warn('Cleave is missing. Please download from https://github.com/nosir/cleave.js/ and load the script in the HTML head section!')
      }
    })
  },

  beforeUnmount() {
    if (this.cleave) {
      this.cleave.destroy()
      this.$el.removeEventListener('input', this.inputChange)
    }
  },

  methods: {
    inputChange() {
      this.value = this.$el.value
    }
  }
}
</script>

<style lang="scss">
.vue-form-generator .field-cleave {
}
</style>
