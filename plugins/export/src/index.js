const exportFn = require('./export')
const loadFn = require('./load')

const addMethods = function(Doc, world, nlp) {
  /** create a compressed json object from this document */
  Doc.prototype.export = exportFn

  /** create a compromise object from compressed export data */
  nlp.load = function(data) {
    return loadFn(data, this.world)
  }
}

module.exports = addMethods
