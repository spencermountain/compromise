const _model = require('./model')
const _methods = require('./methods')

const preTagger = function (document, methods, model) {
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
  methods.checkLexicon(terms, model)
  // look at word ending
  methods.checkSuffix(terms, model)
  // try look-like rules
  methods.checkRegex(terms, model)
  //  fallback methods
  methods.checkCase(document)
  // more-involved regexes
  methods.checkAcronym(terms, model)
  // check for stem in lexicon
  methods.checkPrefix(terms, model)
  //  ¯\_(ツ)_/¯
  methods.nounFallback(document, model)
  // deduce parent tags
  methods.fillTags(terms, model)

  return document
}

const plugin = function (methods, model, parsers) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  parsers.push(preTagger)
}
module.exports = plugin
