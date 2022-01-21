const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]'

const isObject = item => item && typeof item === 'object' && !Array.isArray(item)

const isSet = item => item instanceof Set

// deep-i-guess clone of model object
const deepClone = function (model) {
  for (const key in model) {
    if (isObject(model[key])) {
      model[key] = Object.assign({}, model[key])
      model[key] = deepClone(model[key]) //recursive
    } else if (isArray(model[key])) {
      model[key] = model[key].slice(0)
    } else if (isSet(model[key])) {
      model[key] = new Set(model[key])
    }
  }
  return model
}
export default deepClone
