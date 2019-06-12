const parseSyntax = require('./syntax')

/** return a new Doc, with this one as a parent */
exports.match = function(reg) {
  //parse-up the input expression
  let regs = parseSyntax(reg)
  //try expression on each phrase
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.match(regs))
  }, [])
  return this.buildFrom(matches)
}

/** return all results except for this */
exports.not = function(reg) {
  //parse-up the input expression
  let regs = parseSyntax(reg)
  //try expression on each phrase
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.not(regs))
  }, [])
  return this.buildFrom(matches)
}

/** return only the first match */
exports.matchOne = function(reg) {
  let regs = parseSyntax(reg)
  let found = this.list.find(p => p.match(regs).length > 0)
  return this.buildFrom([found])
}

/** return a Document with three parts for every match
 * seperate everything before the word, as a new phrase
 */
exports.split = function(reg) {
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    let allFound = p.match(regs)
    //no match, keep it going
    if (allFound.length === 0) {
      matches.push(p)
    }
    allFound.forEach(found => {
      // do it again, at the end
      let last = matches.pop() || p
      let results = last.splitOn(found) //splits into three parts
      if (results.before) {
        matches.push(results.before)
      }
      if (results.match) {
        matches.push(results.match)
      }
      if (results.after) {
        matches.push(results.after)
      }
    })
  })
  return this.buildFrom(matches)
}

/** return a Document with two parts for every match
 * seperate everything after the word, as a new phrase
 */
exports.splitAfter = function(reg) {
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    let allFound = p.match(regs)
    //no match, return whole phrase
    if (allFound.length === 0) {
      matches.push(p)
    }
    allFound.forEach(found => {
      // apply it to the end, recursively
      let last = matches.pop() || p
      let results = last.splitOn(found) //splits into three parts
      //merge first and second parts
      if (results.before && results.match) {
        results.before.length += results.match.length
        matches.push(results.before)
      } else if (results.match) {
        matches.push(results.match)
      }
      // add third part, if it exists
      if (results.after) {
        matches.push(results.after)
      }
    })
  })
  return this.buildFrom(matches)
}

/** return a Document with two parts for every match */
exports.splitBefore = function(reg) {
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    let allFound = p.match(regs)
    //no match, keep it going
    if (allFound.length === 0) {
      matches.push(p)
    }
    allFound.forEach(found => {
      // do it again, at the end
      let last = matches.pop() || p
      let results = last.splitOn(found) //splits into three parts
      //support multiple-matches per phrase
      if (results.before) {
        matches.push(results.before)
      }
      //merge 'match' and 'after'
      if (results.match && results.after) {
        results.match.length += results.after.length
        matches.push(results.match)
      } else if (results.match) {
        matches.push(results.match)
      }
    })
  })
  return this.buildFrom(matches)
}

/**Return a boolean if this match exists */
exports.has = function(reg) {
  let regs = parseSyntax(reg)
  let found = this.list.find(p => p.match(regs).length > 0)
  return found !== undefined
}

/** return each current phrase, only if it contains this match */
exports.if = function(reg) {
  let regs = parseSyntax(reg)
  let found = this.list.filter(p => p.match(regs).length > 0)
  return this.buildFrom(found)
}

/** Filter-out any current phrases that have this match*/
exports.ifNo = function(reg) {
  let regs = parseSyntax(reg)
  let found = this.list.filter(p => p.match(regs).length === 0)
  return this.buildFrom(found)
  // console.log(found)
  // return new Doc(found, this, this.world)
}

//aliases
// methods.splitOn = methods.split
