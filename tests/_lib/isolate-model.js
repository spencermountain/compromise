/* global structuredClone */
// Mutate copies during a test; restore the original model fields afterward.
const isolateModel = (t, model, keys) => {
  const original = Object.getOwnPropertyDescriptors(model)
  t.teardown(() => {
    keys.forEach(key => {
      if (Object.hasOwn(original, key)) {
        Object.defineProperty(model, key, original[key])
      } else {
        delete model[key]
      }
    })
  })
  keys.forEach(key => {
    model[key] = structuredClone(model[key])
  })
}

export default isolateModel
