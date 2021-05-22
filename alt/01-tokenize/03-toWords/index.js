const doPunct = require('./01-punctuation')
const killUnicode = require('./02-unicode')
const normalize = require('./03-normalize')
const reduce = require('./05-reduce')

const hasSlash = /\//
// basically, tokenize for terms.

/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */
const parseTerm = txt => {
  // cleanup any punctuation as whitespace
  let { str, pre, post } = doPunct(txt)
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = killUnicode(str)
  // create the various forms of our text,
  let clean = normalize(str)
  const parsed = {
    text: str,
    clean: clean,
    reduced: reduce(clean),
    pre: pre,
    post: post,
  }
  // support aliases for slashes
  if (hasSlash.test(str)) {
    str.split(hasSlash).forEach(word => {
      parsed.alias = parsed.alias || {}
      parsed.alias[word.trim()] = true
    })
  }
  return parsed
}
module.exports = parseTerm
