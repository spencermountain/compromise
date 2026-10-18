const isObject = item => item && typeof item === 'object' && !Array.isArray(item)
const isArray = Array.isArray
const isSet = item => item instanceof Set

export { isObject, isArray, isSet }
