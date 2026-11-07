// a plain object - not an array, null, or class instance
const isObject = val => Object.prototype.toString.call(val) === '[object Object]'
export default isObject
