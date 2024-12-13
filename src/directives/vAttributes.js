function setAttributes (el, binding) {
  let attributes = {}

  if (binding.instance.schema?.attributes) {
    attributes = { ...binding.instance.schema?.attributes }
  }

  const container = binding.value || 'input'
  if ( typeof container === 'string' ) {
    attributes = attributes[container] || attributes
  }

  Object.entries(attributes).forEach(([ key, value ]) => {
    el.setAttribute(key, value)
  })
}

export const vAttributes = {
  beforeMount: (el, binding) => setAttributes(el, binding),
  updated: (el, binding) => setAttributes(el, binding)
}