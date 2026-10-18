const isClientSide = () => typeof window !== 'undefined' && window.document

// Output the requested format, or the platform's default console view.
const debug = function (fmt) {
  const debugMethods = this.methods.one.debug || {}
  if (!fmt || !Object.hasOwn(debugMethods, fmt)) {
    fmt = isClientSide() ? 'clientSide' : 'tags'
  }
  debugMethods[fmt](this)
  return this
}

export default debug
