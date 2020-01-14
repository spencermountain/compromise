const failFast = require('./02-failFast')
const tryMatch = require('./03-tryMatch')
const postProcess = require('./04-postProcess')
const syntax = require('../../Doc/match/syntax')
const makeId = require('../../Term/_id')

/**  returns a simple array of arrays */
const matchAll = function(p, regs, matchOne = false) {
  //if we forgot to parse it..
  if (typeof regs === 'string') {
    regs = syntax(regs)
  }
  //try to dismiss it, at-once
  if (failFast(p, regs) === true) {
    return []
  }

  //any match needs to be this long, at least
  const minLength = regs.filter(r => r.optional !== true).length
  let terms = p.cache.terms || p.terms()
  let matches = []

  //optimisation for '^' start logic
  if (regs[0].start === true) {
    let match = tryMatch(terms, regs, 0, terms.length)
    if (match !== false && match.length > 0) {
      matches.push(match)
    }
    // remove (intentional) null results
    matches = matches.map(arr => {
      return arr.filter(t => t)
    })
    return postProcess(terms, regs, matches)
  }
  //try starting, from every term
  for (let i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      break
    }
    //try it!
    let match = tryMatch(terms.slice(i), regs, i, terms.length)
    if (match !== false && match.length > 0) {
      //zoom forward!
      i += match.length - 1
      //[capture-groups] return some null responses
      match = match.filter(m => m)
      matches.push(match)

      //add to names if named capture group
      const names = regs.filter(r => typeof r.capture === 'string' || typeof r.capture === 'number')
      const captureArr = match.map(m => m.group)
      let previousFirst = 0

      for (let j = 0; j < names.length; j++) {
        const { capture: name } = names[j]

        // Get first and last terms that use this group name
        const firstIdx = captureArr.indexOf(name, previousFirst)

        const first = match[firstIdx]
        let length = 0

        for (let l = firstIdx; l < captureArr.length; l++) {
          const element = match[l]

          if (element.group !== name) {
            break
          }

          length++
        }

        if (first) {
          previousFirst = firstIdx
          p.names[makeId(name)] = {
            group: name.toString(),
            start: first.id,
            length,
          }
        }
      }

      //ok, maybe that's enough?
      if (matchOne === true) {
        return postProcess(terms, regs, matches)
      }
    }
  }
  return postProcess(terms, regs, matches)
}
module.exports = matchAll
