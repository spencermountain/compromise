const failFast = require('./02-failFast')
const tryMatch = require('./03-tryMatch')
const postProcess = require('./04-postProcess')
const syntax = require('../../Doc/match/syntax')

/**  returns a simple array of arrays */
const matchAll = function (p, regs, matchOne = false) {
  //if we forgot to parse it..
  if (typeof regs === 'string') {
    regs = syntax(regs)
  }
  //try to dismiss it, at-once
  if (failFast(p, regs) === true) {
    return []
  }

  //any match needs to be this long, at least
  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length
  let terms = p.terms()
  let matches = []

  //optimisation for '^' start logic
  if (regs[0].start === true) {
    let [match, groups] = tryMatch(terms, regs, 0, terms.length)
    if (match !== false && match.length > 0) {
      match = match.filter(m => m)
      matches.push({ match, groups })
    }

    return postProcess(terms, regs, matches)
  }
  //try starting, from every term
  for (let i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      break
    }
    //try it!
    let [match, groups] = tryMatch(terms.slice(i), regs, i, terms.length)
    if (match !== false && match.length > 0) {
      //zoom forward!
      i += match.length - 1
      //[capture-groups] return some null responses
      match = match.filter(m => m)
      matches.push({ match, groups })

      //ok, maybe that's enough?
      if (matchOne === true) {
        return postProcess(terms, regs, matches)
      }
    }
  }
  return postProcess(terms, regs, matches)
}
module.exports = matchAll
