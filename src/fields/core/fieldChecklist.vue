<template>
  <div v-attributes="'wrapper'" class="wrapper">
    <div v-if="schema.listBox" class="listbox form-control" :disabled="disabled || null">
      <div v-for="item in items" :key="item" class="list-row" :class="{'is-checked': isItemChecked(item)}">
        <label>
          <input
            :id="getFieldID(schema, true)"
            v-attributes="'input'"
            type="checkbox"
            :checked="isItemChecked(item) || null"
            :disabled="disabled || null"
            :name="getInputName(item)"
            @change="onChanged($event, item)"
          >
          {{ getItemName(item) }}
        </label>
      </div>
    </div>

    <div v-if="!schema.listBox" class="combobox form-control" :disabled="disabled || null">
      <div class="mainRow" :class="{ expanded: comboExpanded }" @click="onExpandCombo">
        <div class="info">
          {{ selectedCount }} selected
        </div>
        <div class="arrow" />
      </div>

      <div v-if="comboExpanded" class="dropList">
        <div
          v-for="item in items"
          :key="item"
          class="list-row"
          :class="{'is-checked': isItemChecked(item)}"
        >
          <label>
            <input
              :id="getFieldID(schema, true)"
              v-attributes="'input'"
              type="checkbox"
              :checked="isItemChecked(item) || null"
              :disabled="disabled || null"
              :name="getInputName(item)"
              @change="onChanged($event, item)"
            >
            {{ getItemName(item) }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { isObject, isNil, clone } from 'lodash'
import abstractField from '../abstractField.js'
import { slugify } from '../../utils/schema'

export default {
  name: 'FieldChecklist',
  mixins: [ abstractField ],

  data() {
    return {
      comboExpanded: false
    }
  },

  computed: {
    items() {
      let values = this.schema.values
      if (typeof values == 'function') {
        return values.apply(this, [ this.model, this.schema ])
      } else return values
    },

    selectedCount() {
      if (this.value) return this.value.length

      return 0
    }
  },

  methods: {
    getInputName(item) {
      if (this.schema && this.schema.inputName && this.schema.inputName.length > 0) {
        return slugify(this.schema.inputName + '_' + this.getItemValue(item))
      }
      return slugify(this.getItemValue(item))
    },

    getItemValue(item) {
      if (isObject(item)) {
        if (typeof this.schema['checklistOptions'] !== 'undefined' && typeof this.schema['checklistOptions']['value'] !== 'undefined') {
          return item[this.schema.checklistOptions.value]
        } else {
          if (typeof item['value'] !== 'undefined') {
            return item.value
          } else {
            throw '`value` is not defined. If you want to use another key name, add a `value` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values'
          }
        }
      } else {
        return item
      }
    },
    getItemName(item) {
      if (isObject(item)) {
        if (typeof this.schema['checklistOptions'] !== 'undefined' && typeof this.schema['checklistOptions']['name'] !== 'undefined') {
          return item[this.schema.checklistOptions.name]
        } else {
          if (typeof item['name'] !== 'undefined') {
            return item.name
          } else {
            throw '`name` is not defined. If you want to use another key name, add a `name` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values'
          }
        }
      } else {
        return item
      }
    },

    isItemChecked(item) {
      return this.value && this.value.indexOf(this.getItemValue(item)) !== -1
    },

    onChanged(event, item) {
      if (isNil(this.value) || !Array.isArray(this.value)) {
        this.value = []
      }

      if (event.target.checked) {
        // Note: If you modify this.value array, it won't trigger the `set` in computed field
        const arr = clone(this.value)
        arr.push(this.getItemValue(item))
        this.value = arr
      } else {
        // Note: If you modify this.value array, it won't trigger the `set` in computed field
        const arr = clone(this.value)
        arr.splice(this.value.indexOf(this.getItemValue(item)), 1)
        this.value = arr
      }
    },

    onExpandCombo() {
      this.comboExpanded = !this.comboExpanded
    }
  }
}
</script>


<style lang="scss">
.vue-form-generator .field-checklist {
	.listbox,
	.dropList {
		height: auto;
		max-height: 150px;
		overflow: auto;

		.list-row {
			label {
				font-weight: initial;
			}

			input {
				margin-right: 0.3em;
			}
		}
	}

	.combobox {
		height: initial;
		overflow: hidden;

		.mainRow {
			cursor: pointer;
			position: relative;
			padding-right: 10px;

			.arrow {
				position: absolute;
				right: -9px;
				top: 3px;
				width: 16px;
				height: 16px;

				transform: rotate(0deg);
				transition: transform 0.5s;

				background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGdJREFUOI3tzjsOwjAURNGDUqSgTxU5K2AVrJtswjUsgHSR0qdxAZZFPrS+3ZvRzBsqf9MUtBtazJk+oMe0VTriiZCFX8nbpENMgfARjsn74vKj5IFruhfc8d6zIF9S/Hyk5HS4spMVeFcOjszaOwMAAAAASUVORK5CYII=");
				background-repeat: no-repeat;
			}

			&.expanded {
				.arrow {
					transform: rotate(-180deg);
				}
			}
		}

		.dropList {
			transition: height 0.5s;
			//margin-top: 0.5em;
		}
	}
}
</style>
