<template>
  <div v-attributes="'wrapper'" class="wrapper">
    <input
      :id="getFieldID(schema)"
      v-attributes="'input'"
      class="form-control"
      :type="inputType"
      :value="value"
      :class="schema.fieldClasses"
      :disabled="disabled || null"
      :accept="schema.accept"
      :alt="schema.alt"
      :autocomplete="schema.autocomplete"
      :checked="schema.checked || null"
      :dirname="schema.dirname"
      :formaction="schema.formaction"
      :formenctype="schema.formenctype"
      :name="schema.inputName"
      :formmethod="schema.formmethod"
      :formnovalidate="schema.formnovalidate"
      :formtarget="schema.formtarget"
      :height="schema.height"
      :list="schema.list"
      :max="schema.max"
      :maxlength="schema.maxlength"
      :min="schema.min"
      :minlength="schema.minlength"
      :multiple="schema.multiple"
      :pattern="schema.pattern"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :required="schema.required"
      :size="schema && schema.size > 0 ? schema.size : 1"
      :src="schema.src"
      :step="schema.step"
      :width="schema.width"
      :files="schema.files"
      @input="onInput"
      @blur="onBlur"
      @change="schema.onChange"
    >
    <span v-if="schema.inputType.toLowerCase() === 'color' || schema.inputType.toLowerCase() === 'range'" class="helper">
      {{ value }}
    </span>
  </div>
</template>

<script>
import abstractField from '../abstractField.js'
import { debounce, get as objGet, isFunction, isNumber } from 'lodash'
import fecha from 'fecha'

const DATETIME_FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm:ss',
  'datetime-local': 'YYYY-MM-DDTHH:mm:ss'
}

export default {
  name: 'FieldInput',
  mixins: [ abstractField ],
  computed: {
    inputType() {
      if(this.schema && this.schema.inputType === 'datetime') {
        // convert "datetime" to "datetime-local" (datetime deprecated in favor of "datetime-local")
        // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime
        return 'datetime-local'
      }
      return this.schema.inputType
    }
  },

  mounted() {
    switch (this.schema.inputType.toLowerCase()) {
      case 'number':
      case 'range':
        this.debouncedFormatFunc = debounce(
          (newValue, oldValue) => {
            this.formatNumberToModel(newValue, oldValue)
          },
          parseInt(objGet(this.schema, 'debounceFormatTimeout', 1000)),
          {
            trailing: true,
            leading: false
          }
        )
        break
      case 'date':
      case 'datetime':
      case 'datetime-local':
        // wait 1s before calling 'formatDatetimeToModel' to allow user to input data
        this.debouncedFormatFunc = debounce(
          (newValue, oldValue) => {
            this.formatDatetimeToModel(newValue, oldValue)
          },
          parseInt(objGet(this.schema, 'debounceFormatTimeout', 1000)),
          {
            trailing: true,
            leading: false
          }
        )
        break
    }
  },

  created() {
    if (this.schema.inputType.toLowerCase() === 'file') {
      console.warn('The \'file\' type in input field is deprecated. Use \'file\' field instead.')
    }
  },
  methods: {
    formatValueToModel(value) {
      if (value != null) {
        switch (this.schema.inputType.toLowerCase()) {
          case 'date':
          case 'datetime':
          case 'datetime-local':
          case 'number':
          case 'range':
            // debounce
            return (newValue, oldValue) => {
              this.debouncedFormatFunc(value, oldValue)
            }
        }
      }

      return value
    },
    formatValueToField(value) {
      switch(this.schema.inputType.toLowerCase()) {
        case 'date':
        case 'datetime':
        case 'datetime-local':
          return this.formatDatetimeValueToField(value)
      }
      return value
    },
    formatDatetimeToModel(newValue, oldValue) {
      const format = DATETIME_FORMATS[this.schema.inputType.toLowerCase()]
      if (newValue) {
        let m = fecha.parse(newValue, format)
        if (m !== false) {
          if (this.schema.format) {
            newValue = fecha.format(m, this.schema.format)
          } else {
            newValue = m.valueOf()
          }
        }
      }
      this.updateModelValue(newValue, oldValue)
    },
    formatDatetimeValueToField(value) {
      if (!value) return null

      const format = DATETIME_FORMATS[this.schema.inputType.toLowerCase()]
      let m = value

      if(!isNumber(value)) {
        m = fecha.parse(value, format)
      }

      return m !== false ? fecha.format(m, format) : value
    },
    formatNumberToModel(newValue, oldValue) {
      if (!isNumber(newValue)) {
        newValue = NaN
      }
      this.updateModelValue(newValue, oldValue)
    },
    onInput($event) {
      let value = $event.target.value
      switch (this.schema.inputType.toLowerCase()) {
        case 'number':
        case 'range':
          if (isNumber(parseFloat($event.target.value))) {
            value = parseFloat($event.target.value)
          }
          break
      }
      this.value = value
    },
    onBlur($event) {
      if (isFunction(this.debouncedFormatFunc)) {
        this.debouncedFormatFunc.flush()
      }

      this.$emit('blur', $event.target.value, this.schema.model)
    }
  }
}
</script>

<style lang="scss">
.vue-form-generator .field-input {
	.wrapper {
		width: 100%;
	}
	input[type="radio"] {
		width: 100%;
	}
	input[type="color"] {
		width: 60px;
	}
	input[type="range"] {
		padding: 0;
	}

	.helper {
		margin: auto 0.5em;
	}
}
</style>
