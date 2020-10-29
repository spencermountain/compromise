const parseSyntax = require('../match/syntax')
const checkCache = require('../match/checkCache')

/** return a new Doc, with this one as a parent */
exports.match = function (reg, name) {
  //parse-up the input expression
  let regs = parseSyntax(reg)
  if (regs.length === 0) {
    return this.buildFrom([])
  }
  //check our cache, if it exists
  if (checkCache(this, regs) === false) {
    return this.buildFrom([])
  }
  //try expression on each phrase
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.match(regs))
  }, [])

  if (name !== undefined && name !== null && name !== '') {
    return this.buildFrom(matches).groups(name)
  }
  return this.buildFrom(matches)
}

/** return all results except for this */
exports.not = function (reg) {
  //parse-up the input expression
  let regs = parseSyntax(reg)
  //if it's empty, return them all!
  if (regs.length === 0 || checkCache(this, regs) === false) {
    return this
  }
  //try expression on each phrase
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.not(regs))
  }, [])
  return this.buildFrom(matches)
}

/** return only the first match */
exports.matchOne = function (reg) {
  let regs = parseSyntax(reg)
  //check our cache, if it exists
  if (checkCache(this, regs) === false) {
    return this.buildFrom([])
  }
  for (let i = 0; i < this.list.length; i++) {
    let match = this.list[i].match(regs, true)
    return this.buildFrom(match)
  }
  return this.buildFrom([])
}

/** return each current phrase, only if it contains this match */
exports.if = function (reg) {
  let regs = parseSyntax(reg)
  //consult our cache, if it exists
  if (checkCache(this, regs) === false) {
    return this.buildFrom([])
  }
  let found = this.list.filter(p => p.has(regs) === true)
  return this.buildFrom(found)
}

/** Filter-out any current phrases that have this match*/
exports.ifNo = function (reg) {
  let regs = parseSyntax(reg)
  let found = this.list.filter(p => p.has(regs) === false)
  return this.buildFrom(found)
}

/**Return a boolean if this match exists */
exports.has = function (reg) {
  let regs = parseSyntax(reg)
  //consult our cache, if it exists
  if (checkCache(this, regs) === false) {
    return false
  }
  return this.list.some(p => p.has(regs) === true)
}

/** match any terms after our matches, within the sentence */
exports.lookAhead = function (reg) {
  // find everything afterwards, by default
  if (!reg) {
    reg = '.*'
  }
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    matches = matches.concat(p.lookAhead(regs))
  })
  matches = matches.filter(p => p)
  return this.buildFrom(matches)
}
exports.lookAfter = exports.lookAhead

/** match any terms before our matches, within the sentence */
exports.lookBehind = function (reg) {
  // find everything afterwards, by default
  if (!reg) {
    reg = '.*'
  }
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    matches = matches.concat(p.lookBehind(regs))
  })
  matches = matches.filter(p => p)
  return this.buildFrom(matches)
}
exports.lookBefore = exports.lookBehind

/** return all terms before a match, in each phrase */
exports.before = function (reg) {
  let regs = parseSyntax(reg)
  //only the phrases we care about
  let phrases = this.if(regs).list
  let befores = phrases.map(p => {
    let ids = p.terms().map(t => t.id)
    //run the search again
    let m = p.match(regs)[0]
    let index = ids.indexOf(m.start)
    //nothing is before a first-term match
    if (index === 0 || index === -1) {
      return null
    }
    return p.buildFrom(p.start, index)
  })
  befores = befores.filter(p => p !== null)
  return this.buildFrom(befores)
}

/** return all terms after a match, in each phrase */
exports.after = function (reg) {
  let regs = parseSyntax(reg)
  //only the phrases we care about
  let phrases = this.if(regs).list
  let befores = phrases.map(p => {
    let terms = p.terms()
    let ids = terms.map(t => t.id)
    //run the search again
    let m = p.match(regs)[0]
    let index = ids.indexOf(m.start)
    //skip if nothing is after it
    if (index === -1 || !terms[index + m.length]) {
      return null
    }
    //create the new phrase, after our match.
    let id = terms[index + m.length].id
    let len = p.length - index - m.length
    return p.buildFrom(id, len)
  })
  befores = befores.filter(p => p !== null)
  return this.buildFrom(befores)
}

/** return only results with this match afterwards */
exports.hasAfter = function (reg) {
  return this.filter(doc => {
    return doc.lookAfter(reg).found
  })
}
/** return only results with this match before it */
exports.hasBefore = function (reg) {
  return this.filter(doc => {
    return doc.lookBefore(reg).found
  })
}
