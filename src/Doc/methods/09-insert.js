const tokenize = require('../../01-tokenizer')
const parseSyntax = require('./match/syntax')

/** add these new terms to the end*/
exports.append = function(str) {
  if (!str) {
    return this
  }
  //add it to end of every phrase
  this.list.forEach(p => {
    //build it
    let phrase = tokenize.fromText(str, this.world, this.pool())[0] //assume it's one sentence, for now
    //tag it
    let tmpDoc = this.buildFrom([phrase])
    tmpDoc.tagger()
    // push it onto the end
    p.append(phrase, this)
  })
  return this
}
exports.insertAfter = exports.append
exports.insertAt = exports.append

/** add these new terms to the front*/
exports.prepend = function(str) {
  if (!str) {
    return this
  }
  //add it to start of every phrase
  this.list.forEach(p => {
    //build it
    let phrase = tokenize.fromText(str, this.world, this.pool())[0] //assume it's one sentence, for now
    //tag it
    let tmpDoc = this.buildFrom([phrase])
    tmpDoc.tagger()
    // add it to the start
    p.prepend(phrase, this)
  })
  return this
}
exports.insertBefore = exports.prepend

/** add these new things to the end*/
exports.concat = function() {
  let list = this.list.slice(0)
  //repeat for any number of params
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]
    //support a fresh string
    if (typeof arg === 'string') {
      let arr = tokenize.fromText(arg, this.world)
      //TODO: phrase.tagger()?
      list = list.concat(arr)
    } else if (arg.isA === 'Doc') {
      list = list.concat(arg.list)
    } else if (arg.isA === 'Phrase') {
      list.push(arg)
    }
  }
  return this.buildFrom(list)
}

/** return a Document with three parts for every match
 * seperate everything before the word, as a new phrase
 */
exports.split = function(reg) {
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
exports.splitOn = exports.split

/** return a Document with two parts for every match
 * seperate everything after the word, as a new phrase
 */
exports.splitAfter = function(reg) {
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

/** return a Document with two parts for every match */
exports.splitBefore = function(reg) {
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
