// const { MatchParser } = require("./parser")
const { NLPRegexP } = require('./regex')

// nlp compromise plugin
const plugin = (Doc, _world, nlp, Phrase) => {
  const preCompile = (regex) => new NLPRegexP(regex)
  nlp.preCompile = preCompile

  const strictMatch = function (regex) {
    // function, non arrow, need bind for this which is doc/phrase
    regex = new NLPRegexP(regex) // coerce the value
    return regex.exec(this)
  }
  Doc.prototype.strictMatch = strictMatch
  Phrase.prototype.strictMatch = strictMatch
  // Doc.prototype.match = strictMatch
  // Phrase.prototype.match = strictMatch
}
module.exports = plugin
