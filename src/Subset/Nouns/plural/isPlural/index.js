const rules = require('./_rules')
const endS = /s$/
// double-check this term, if it is not plural, or singular.
// (this is a partial copy of ./tagger/fallbacks/plural)
// fallback plural if it ends in an 's'.
const isPlural = function (str) {
  // isSingular suffix rules
  if (rules.isSingular.find(reg => reg.test(str))) {
    return false
  }
  // does it end in an s?
  if (endS.test(str) === true) {
    return true
  }
  // is it a plural like 'fungi'?
  if (rules.isPlural.find(reg => reg.test(str))) {
    return true
  }
  return null
}
module.exports = isPlural
