const exportFn = require('./export')
const loadFn = require('./import')

const addMethods = function (Doc, world, nlp) {
  /** create a compressed json object from this document */
  Doc.prototype.export = exportFn

  /** create a compromise object from compressed export data */
  nlp.import = function (data) {
    let json = loadFn(data, this.world)
    return nlp.fromJSON(json)
  }
  nlp.load = nlp.import
}

module.exports = addMethods
