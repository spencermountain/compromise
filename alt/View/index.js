let methods = {}
let model = {}
let process = []

class View {
  constructor(document, pointer) {
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

  /** return data */
  json() {
    return this.document
  }
  fork() {
    this.document = JSON.parse(JSON.stringify(this.document))
    return this
  }
}

module.exports = View
