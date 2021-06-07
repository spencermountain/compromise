const _model = require('./model')
const _methods = require('./methods')

const preTagger = function (view) {
  let { document, methods, model } = view
  // start with all terms
  let terms = []
  for (let i = 0; i < document.length; i += 1) {
    for (let o = 0; o < document[i].length; o += 1) {
      let t = document[i][o]
      t.tags = t.tags === undefined ? new Set() : t.tags // set empty tags
      terms.push(t)
    }
  }
  // lookup known words
  if (methods.checkLexicon) {
    methods.checkLexicon(terms, model)
  }
  // look at word ending
  if (methods.checkSuffix) {
    methods.checkSuffix(terms, model)
  }
  // try look-like rules
  if (methods.checkRegex) {
    methods.checkRegex(terms, model)
  }
  //  fallback methods
  if (methods.checkCase) {
    methods.checkCase(document)
  }
  if (methods.checkAcronym) {
    methods.checkAcronym(terms, model)
  }
  if (methods.checkNeighbours) {
    methods.checkNeighbours(document, model)
  }
}

const plugin = function (methods, model, process) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  process.push(preTagger)
}
module.exports = plugin
