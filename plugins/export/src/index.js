const exportFn = require('./export')
const loadFn = require('./load')

const addMethods = function(Doc, world, nlp, Phrase, Term, Pool) {
  // console.log(nlp('asdf').list[0].pool)
  /** create a compressed json object from this document */
  Doc.prototype.export = exportFn

  /** create a compromise object from compressed export data */
  nlp.import = function(data) {
    // return loadFn(data, this.world, { Doc, Phrase, Term, Pool })
    let output = loadFn(data, this.world, { Doc, Phrase, Term, Pool })
    return nlp.fromJSON(output)
  }
}

module.exports = addMethods
