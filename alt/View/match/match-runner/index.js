const failFast = require('./02-failFast')
const tryMatch = require('./03-tryMatch')
const postProcess = require('./04-postProcess')
const syntax = require('../match-syntax')
// const idLookup = require('./idLookup')

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

  // these id-lookups can be super-fast
  // if (regs[0].idBlocks) {
  //   let res = idLookup(terms, regs)
  //   if (res && res.length > 0) {
  //     return postProcess(terms, regs, res)
  //   }
  // }

  //optimisation for '^' start logic
  if (regs[0].start === true) {
    let res = tryMatch(terms, regs, 0, terms.length)
    if (res && res.match && res.match.length > 0) {
      res.match = res.match.filter(m => m)
      matches.push(res)
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
    let res = tryMatch(terms.slice(i), regs, i, terms.length)
    if (res && res.match && res.match.length > 0) {
      //zoom forward!
      i += res.match.length - 1
      //[capture-groups] return some null responses
      res.match = res.match.filter(m => m)
      matches.push(res)

      //ok, maybe that's enough?
      if (matchOne === true) {
        return postProcess(terms, regs, matches)
      }
    }
  }
  return postProcess(terms, regs, matches)
}
module.exports = matchAll
