/* eslint-disable no-console */
const isClientSide = () => typeof window !== 'undefined' && window.document

//output some helpful stuff to the console
const debug = function (fmt) {
  let view = this
  let debugMethods = this.methods.one.debug || {}
  // see if method name exists
  if (fmt && debugMethods.hasOwnProperty(fmt)) {
    debugMethods[fmt](view)
    return view
  }
  // log default client-side view
  if (isClientSide()) {
    debugMethods.clientSide(view)
    return view
  }
  // else, show regular server-side tags view
  debugMethods.tags(view)
  return view
}
export default debug
