const tokenizer = require('../tokenize')
let methods = {}
let model = {}
let process = []

// apply our only default plugin
tokenizer(methods, model, process)

class View {
  constructor(document, pointer) {
    // pre-process
    this.process = process
    this.document = document
    this.methods = methods
    Object.defineProperty(this, 'model', {
      enumerable: false,
      value: model,
      writable: true,
    })
    // vroom!
    this.process.forEach(fn => {
      fn(this)
    })
  }

  json() {
    return this.document
  }
}

// const factory = function (doc) {
//   return new View(doc)
// }
module.exports = View
