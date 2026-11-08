// Output the requested format, or the default tags view
const debug = function (fmt) {
  const debugMethods = this.methods.one.debug || {}
  if (!fmt || !Object.hasOwn(debugMethods, fmt)) {
    fmt = 'tags'
  }
  debugMethods[fmt](this)
  return this
}

export default debug
