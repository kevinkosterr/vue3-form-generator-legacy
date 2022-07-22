import component from "./components/formGenerator.vue";
import { createDefaultObject, getMultipleFields, mergeMultiObjectFields, slugifyFormID, slugify } from "./components/utils/schema";
import validators from "./components/utils/validators";
import fieldComponents from "./components/utils/fieldsLoader";
import abstractField from "./components/fields/abstractField";
const install = (Vue: any, options: any) => {
    Vue.component("VueFormGenerator", module.exports.component);
    if (options && options.validators) {
        for (let key in options.validators) {
            if ({}.hasOwnProperty.call(options.validators, key)) {
                validators[key] = options.validators[key];
            }
        }
    }
};

export default {
    component,
    createDefaultObject,
    getMultipleFields,
    mergeMultiObjectFields,
    slugifyFormID,
    slugify,
    validators,
    abstractField,
    fieldComponents,
    install
};
