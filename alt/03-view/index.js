class View {
  constructor(document, desc = '') {
    this.document = document
    this.desc = desc
  }
}

const toView = function (doc) {
  return new View(doc)
}
module.exports = toView
