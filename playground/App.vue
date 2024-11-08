<script setup>
import { ref } from 'vue'
import FormGenerator from '@/main.ts'

const form = ref({
  model: {
    name: '',
    age: ''
  },
  schema: {
    fields: [
      {
        name: 'Name',
        model: 'name',
        type: 'input',
        inputType: 'text',
        required: true,
        validator: FormGenerator.validators.string
      },
      {
        name: 'Age',
        model: 'age',
        type: 'input',
        inputType: 'number',
        required: true,
        validator: FormGenerator.validators.string
      }
    ]
  }
})
</script>

<template>
  <VueFormGenerator :schema="form.schema" :model="form.model" :options="{validateAfterChanged: true}" />
  {{ form.model }}
</template>
