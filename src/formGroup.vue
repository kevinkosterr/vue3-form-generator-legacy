<template>
  <div class="form-group" :class="getFieldRowClasses(field)">
    <label v-if="hasLabel" :for="fieldId" :class="field.labelClasses">
      <span>
        <i v-if="hasIconBefore" :class="field.labelIcon.iconClass" />
        <template v-if="field.labelHtml">
          <span v-html="field.label" />
        </template>
        <template v-else>{{ field.label }}</template>
        <i v-if="hasIconAfter" :class="field.labelIcon.iconClass" />
      </span>
      <span v-if="field.help" class="help">
        <i class="icon" />
        <div class="helpText">{{ field.help }}</div>
      </span>
    </label>

    <div class="field-wrap">
      <component
        v-bind="getAttributes($attrs)"
        :is="getFieldType(field)"
        ref="child"
        :vfg="vfg || null"
        :disabled="fieldDisabled(field) || null"
        :model="model"
        :schema="field || null"
        :form-options="options || null"
        @blur="onBlur"
        @model-updated="onModelUpdated"
        @validated="onFieldValidated"
      />
      <div v-if="buttonVisibility(field)" class="buttons">
        <button
          v-for="(btn, index) in field.buttons"
          :key="index"
          :class="btn.classes || ''"
          :type="getButtonType(btn)" @click="buttonClickHandler(btn, field, $event)"
          v-text="btn.label"
        />
      </div>
    </div>

    <div v-if="field.hint" class="hint">
      <template v-if="field.hintHtml">
        <span v-html="fieldHint(field)" />
      </template>
      <template v-else>
        {{ fieldHint(field) || '' }}
      </template>
    </div>

    <div v-if="field.notice" class="notices help-block">
      <i class="mdi mdi-information" />
      <span v-if="field.noticeHtml" v-html="fieldNotice(field)" />
      <span v-else>{{ fieldNotice(field) || '' }}</span>
    </div>

    <div v-if="fieldErrors(field).length > 0" class="errors help-block">
      <span v-for="(error, index) in fieldErrors(field)" :key="index">{{ error }}</span>
    </div>
  </div>
</template>

<script>
import { get as objGet, isNil, isFunction } from 'lodash'
import { slugifyFormID } from './utils/schema'
import formMixin from './formMixin.js'
import * as fieldComponents from './utils/fieldsLoader'

export default {
  name: 'FormGroup',
  components: fieldComponents,
  mixins: [ formMixin ],
  props: {
    vfg: {
      type: Object,
      required: true
    },
    model: Object,
    options: {
      type: Object
    },
    field: {
      type: Object,
      required: true
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    hasIconBefore () {
      return this.field.labelIcon && this.field.labelIcon.iconClass && this.field.labelIcon.position === 'before'
    },
    hasIconAfter () {
      return this.field.labelIcon && this.field.labelIcon.iconClass && this.field.labelIcon.position === 'after'
    },
    hasLabel() {
      if (isNil(this.field.label)) return false

      let relevantType = ''
      if (this.field.type === 'input') {
        relevantType = this.field.inputType
      } else {
        relevantType = this.field.type
      }

      switch (relevantType) {
        case 'button':
        case 'submit':
        case 'reset':
          return false
        default:
          return true
      }
    },
    fieldId () {
      const idPrefix = this.options?.fieldIdPrefix ?? ''
      return slugifyFormID(this.field, idPrefix)
    }
  },
  methods: {
    onBlur (newValue, schema) {
      this.$emit('blur', newValue, schema)
    },
    // Should field type have a label?
    getAttributes(attrs) {
      const res = {}
      for(let key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          if (attrs[key]) {
            if (typeof attrs[key] !== 'function') {
              res[key] = attrs[key]
            }
          }
        }
      }
      return res
    },
    // Get type of field 'field-xxx'. It'll be the name of HTML element
    getFieldType(fieldSchema) {
      return 'field-' + fieldSchema.type
    },
    // Get type of button, default to 'button'
    getButtonType(btn) {
      return objGet(btn, 'type', 'button')
    },
    // Child field executed validation
    onFieldValidated(res, errors, field) {
      this.$emit('validated', res, errors, field)
    },
    buttonVisibility(field) {
      return field.buttons && field.buttons.length > 0
    },
    buttonClickHandler(btn, field, event) {
      return btn.onclick.call(this, this.model, field, event, this)
    },
    // Get current hint.
    fieldHint(field) {
      if (isFunction(field.hint)) return field.hint.call(this, this.model, field, this)

      return field.hint
    },
    /** Get current notice for field **/
    fieldNotice (field) {
      if (isFunction(field.notice)) return field.notice.call(this, this.model, field, this)

      return field.notice
    },
    fieldErrors(field) {
      return this.errors.filter((e) => e.field.model === field.model).map((item) => item.error)
    },
    onModelUpdated(newVal, schema) {
      this.$emit('modelUpdated', newVal, schema)
    },
    validate(calledParent) {
      if (this.$refs.child) {
        return this.$refs.child.validate(calledParent)
      }
    },
    clearValidationErrors() {
      if (this.$refs.child) {
        return this.$refs.child.clearValidationErrors()
      }
    }
  }
}
</script>
<style lang="scss">
$errorColor: #f00;
.form-group:not([class*=" col-"]) {
	width: 100%;
}
.form-group {
	display: inline-block;
	vertical-align: top;
	// width: 100%;
	// margin: 0.5rem 0.26rem;
	margin-bottom: 1rem;

	label {
		font-weight: 400;
		& > :first-child {
			display: inline-block;
		}
	}

	&.featured {
		> label {
			font-weight: bold;
		}
	}

	&.required {
		> label:after {
			content: "*";
			font-weight: normal;
			color: Red;
			// position: absolute;
			padding-left: 0.2em;
			font-size: 1em;
		}
	}

	&.disabled {
		> label {
			color: #666;
			font-style: italic;
		}
	}

	&.error {
		input:not([type="checkbox"]),
		textarea,
		select {
			border: 1px solid $errorColor;
			background-color: rgba($errorColor, 0.15);
		}

		.errors {
			color: $errorColor;
			font-size: 0.8em;
			span {
				display: block;
				background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVR4Xt2TMQoCQQxF3xdhu72MpZU3GU/meBFLOztPYrVWsQmEWSaMsIXgK8P8RyYkMjO2sAN+K9gTIAmDAlzoUzE7p4IFytvDCQWJKSStYB2efcAvqZFM0BcstMx5naSDYFzfLhh/4SmRM+6Agw/xIX0tKEDFufeDNRUc4XqLRz3qabVIf3BMHwl6Ktexn3nmAAAAAElFTkSuQmCC");
				background-repeat: no-repeat;
				padding-left: 17px;
				padding-top: 0px;
				margin-top: 0.2em;
				font-weight: 600;
			}
		}
	}
}
</style>
