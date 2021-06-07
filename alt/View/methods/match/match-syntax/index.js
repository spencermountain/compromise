const parseBlocks = require('./01-parseBlocks')
const parseToken = require('./02-parseToken')
const postProcess = require('./03-postProcess')

// add fuzziness etc to each reg
const addOptions = function (tokens, opts) {
  // add default fuzzy-search limit
  if (opts.fuzzy === true) {
    opts.fuzzy = 0.85
  }
  if (typeof opts.fuzzy === 'number') {
    tokens = tokens.map(reg => {
      // add a fuzzy-match on 'word' tokens
      if (opts.fuzzy > 0 && reg.word) {
        reg.fuzzy = opts.fuzzy
      }
      //add it to or|and choices too
      if (reg.choices) {
        reg.choices.forEach(block => {
          block.forEach(r => {
            r.fuzzy = opts.fuzzy
          })
        })
      }
      return reg
    })
  }
  return tokens
}

/** parse a match-syntax string into json */
const syntax = function (input, opts = {}) {
  // fail-fast
  if (input === null || input === undefined || input === '') {
    return []
  }
  if (typeof input === 'number') {
    input = String(input) //go for it?
  }
  let tokens = parseBlocks(input)
  //turn them into objects
  tokens = tokens.map(str => parseToken(str, opts))
  //clean up anything weird
  tokens = postProcess(tokens, opts)
  // add fuzzy limits, etc
  tokens = addOptions(tokens, opts)
  // console.log(tokens)
  return tokens
}

module.exports = syntax
// console.log(syntax('[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)'))
