const addMethods = require('./methods')
let { methods, model } = require('../world')

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
}
addMethods(View)

module.exports = View
