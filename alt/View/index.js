const addMethods = require('./methods')
let { methods, model, parsers } = require('../world')

class View {
  constructor(document, pointer) {
    this.parsers = parsers
    this.document = document
    this.methods = methods
    Object.defineProperty(this, 'model', {
      enumerable: false,
      value: model,
      writable: true,
    })
    // vroom!)
    this.parsers.forEach(fn => {
      fn(this)
    })
  }
}
addMethods(View)

module.exports = View
