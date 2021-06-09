let { methods, model } = require('../world')
const getPointer = require('./_pointer')
const addMethods = require('./methods')
const addAliases = require('./aliases')

class View {
  constructor(document, pointer) {
    this.document = document
    this.methods = methods
    Object.defineProperty(this, 'model', {
      enumerable: false,
      value: model,
      writable: true,
    })
    Object.defineProperty(this, '_cache', {
      enumerable: false,
      value: null,
      writable: true,
    })
    this.pointer = pointer
  }
  /*

    getters:
    -------
  */
  // lazy-getter pattern (fires once)
  get docs() {
    let docs = this.document
    if (this.pointer) {
      docs = getPointer(this.pointer, this.document)
    }
    Object.defineProperty(this, 'docs', {
      value: docs,
    })
    return docs
  }
  // is the view not-empty?
  get found() {
    return this.docs.length > 0
  }
  // create a new View, from this one
  update(pointer) {
    return new View(this.document, pointer)
  }
}
addMethods(View)
addAliases(View)

module.exports = View
