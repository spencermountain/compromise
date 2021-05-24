class View {
  constructor(document, pointer, model, methods) {
    this.document = document
    this.model = model
    this.methods = methods
  }
}

const toView = function (doc) {
  return new View(doc)
}
module.exports = toView
