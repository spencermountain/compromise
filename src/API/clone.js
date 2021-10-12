const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]'

const isObject = item => item && typeof item === 'object' && !Array.isArray(item)

const isSet = item => item instanceof Set

// not-very-deep clone
const deepClone = function (obj) {
  for (const key in obj) {
    if (isObject(obj[key])) {
      obj[key] = Object.assign({}, obj[key])
      // obj[key] = deepClone(obj[key]) //recursive
    } else if (isArray(obj[key])) {
      obj[key] = obj[key].slice(0)
    } else if (isSet(obj[key])) {
      obj[key] = new Set(obj[key])
    }
  }
  return obj
}
export default deepClone
