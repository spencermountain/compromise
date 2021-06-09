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
  /*

    getters:
    -------
  */
  // lazy-getter pattern (fires once)
  get doc() {
    let doc = this.document
    if (this.pointer) {
      doc = getPointer(this.pointer, this.document)
    }
    Object.defineProperty(this, 'doc', {
      value: doc,
    })
    return doc
  }
  // is the view not-empty?
  get found() {
    return this.doc.length > 0
  }
  // create a new View, from this one
  update(pointer) {
    return new View(this.document, pointer)
  }
}
addMethods(View)

module.exports = View
