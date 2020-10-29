const parseSyntax = require('../../match/syntax')

/** return a Document with three parts for every match
 * seperate everything before the word, as a new phrase
 */
exports.splitOn = function (reg) {
  // if there's no match, split parent, instead
  if (!reg) {
    let parent = this.parent()
    return parent.splitOn(this)
  }
  //start looking for a match..
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    let foundEm = p.match(regs)
    //no match here, add full sentence
    if (foundEm.length === 0) {
      matches.push(p)
      return
    }
    // we found something here.
    let carry = p
    foundEm.forEach(found => {
      let parts = carry.splitOn(found)
      // add em in
      if (parts.before) {
        matches.push(parts.before)
      }
      if (parts.match) {
        matches.push(parts.match)
      }
      // start matching now on the end
      carry = parts.after
    })
    // add that last part
    if (carry) {
      matches.push(carry)
    }
  })
  return this.buildFrom(matches)
}

/** return a Document with two parts for every match
 * seperate everything after the word, as a new phrase
 */
exports.splitAfter = function (reg) {
  // if there's no match, split parent, instead
  if (!reg) {
    let parent = this.parent()
    return parent.splitAfter(this)
  }
  // start looking for our matches
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    let foundEm = p.match(regs)
    //no match here, add full sentence
    if (foundEm.length === 0) {
      matches.push(p)
      return
    }
    // we found something here.
    let carry = p
    foundEm.forEach(found => {
      let parts = carry.splitOn(found)
      // add em in
      if (parts.before && parts.match) {
        // merge these two together
        parts.before.length += parts.match.length
        matches.push(parts.before)
      } else if (parts.match) {
        matches.push(parts.match)
      }
      // start matching now on the end
      carry = parts.after
    })
    // add that last part
    if (carry) {
      matches.push(carry)
    }
  })
  return this.buildFrom(matches)
}
exports.split = exports.splitAfter //i guess?

/** return a Document with two parts for every match */
exports.splitBefore = function (reg) {
  // if there's no match, split parent, instead
  if (!reg) {
    let parent = this.parent()
    return parent.splitBefore(this)
  }
  //start looking for a match..
  let regs = parseSyntax(reg)
  let matches = []
  this.list.forEach(p => {
    let foundEm = p.match(regs)
    //no match here, add full sentence
    if (foundEm.length === 0) {
      matches.push(p)
      return
    }
    // we found something here.
    let carry = p
    foundEm.forEach(found => {
      let parts = carry.splitOn(found)
      // add before part in
      if (parts.before) {
        matches.push(parts.before)
      }
      // merge match+after
      if (parts.match && parts.after) {
        parts.match.length += parts.after.length
      }
      // start matching now on the end
      carry = parts.match
    })
    // add that last part
    if (carry) {
      matches.push(carry)
    }
  })
  return this.buildFrom(matches)
}

/** split a document into labeled sections */
exports.segment = function (regs, options) {
  regs = regs || {}
  options = options || { text: true }
  let doc = this
  let keys = Object.keys(regs)
  // split em
  keys.forEach(k => {
    doc = doc.splitOn(k)
  })
  //add labels for each section
  doc.list.forEach(p => {
    for (let i = 0; i < keys.length; i += 1) {
      if (p.has(keys[i])) {
        p.segment = regs[keys[i]]
        return
      }
    }
  })
  return doc.list.map(p => {
    let res = p.json(options)
    res.segment = p.segment || null
    return res
  })
}
