import component from './formGenerator.vue'
import { createDefaultObject, getMultipleFields, mergeMultiObjectFields, slugifyFormID, slugify } from './utils/schema'
import validators from './utils/validators'
import abstractField from './fields/abstractField'
import formGenerator from './formGenerator.vue'

export default {
  component,
  validators,
  install: (app: any, options: any) => {
    app.component('VueFormGenerator', formGenerator)
    if (options && options.validators) {
      for (const key in options.validators) {
        if ({}.hasOwnProperty.call(options.validators, key)) {
          validators[key] = options.validators[key]
        }
      }
    }
  }
}

export {
  abstractField,
  createDefaultObject,
  getMultipleFields,
  mergeMultiObjectFields,
  slugifyFormID,
  slugify
}
