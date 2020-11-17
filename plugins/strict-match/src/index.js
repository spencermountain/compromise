import { NLPRegexP } from "./regex"

export { NLPMatchParser } from "./parser"
export { NLPRegexP, NLPRegexParseError } from "./regex"

// nlp compromise plugin
export const plugin = (Doc, world, nlp, Phrase) => {
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
export default plugin
