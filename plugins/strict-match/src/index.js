const { NLPMatchParser } = require("./parser")
const { NLPRegexP, NLPRegexParseError } = require("./regex")

// nlp compromise plugin
const plugin = (Doc, _world, nlp, Phrase) => {
  const compileRegex = (regex) => new NLPRegexP(regex)
  nlp.compileRegex = compileRegex
  Doc.prototype.compileRegex = compileRegex

  const strictMatch = function (regex) {
    // function, non arrow, need bind for this which is doc/phrase
    regex = new NLPRegexP(regex) // coerce the value
    return regex.exec(this)
  }
  Doc.prototype.strictMatch = strictMatch
  Phrase.prototype.strictMatch = strictMatch
}
module.exports = {
  plugin: plugin,
  NLPMatchParser: NLPMatchParser,
  NLPRegexParseError: NLPRegexParseError,
}
