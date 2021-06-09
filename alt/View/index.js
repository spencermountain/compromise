const addMethods = require('./methods')
let { methods, model } = require('../world')
const getPointer = require('./pointer')

class View {
  constructor(document, pointer) {
    this.document = document
    this.methods = methods
    Object.defineProperty(this, 'model', {
      enumerable: false,
      value: model,
      writable: true,
    })
    this.pointer = pointer
  }
  // lazy-getter pattern (fires once)
  get doc() {
    let doc = getPointer(this.pointer, this.document)
    Object.defineProperty(this, 'doc', {
      value: doc,
    })
    return doc
  }
}
addMethods(View)

module.exports = View
