const tokenize = require('../../../01-tokenizer')
const isObject = function (obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

// if it's empty, just create the phrase
const makeNew = function (str, doc) {
  let phrase = tokenize(str, doc.world)[0] //assume it's one sentence, for now
  let tmpDoc = doc.buildFrom([phrase])
  tmpDoc.tagger()
  doc.list = tmpDoc.list
  return doc
}

/** add these new terms to the end*/
exports.append = function (str = '') {
  if (!str) {
    return this
  }
  // if it's empty, just create the phrase
  if (!this.found) {
    return makeNew(str, this)
  }
  // clear the cache
  this.uncache()
  //add it to end of every phrase
  this.list.forEach(p => {
    //build it
    let phrase
    if (isObject(str) && str.isA === 'Doc') {
      phrase = str.list[0].clone() //use the first phrase
    } else if (typeof str === 'string') {
      phrase = tokenize(str, this.world, this.pool())[0] //assume it's one sentence, for now
    }
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
exports.prepend = function (str) {
  if (!str) {
    return this
  }
  // if it's empty, just create the phrase
  if (!this.found) {
    return makeNew(str, this)
  }
  // clear the cache
  this.uncache()
  //add it to start of every phrase
  this.list.forEach(p => {
    //build it
    let phrase
    if (isObject(str) && str.isA === 'Doc') {
      phrase = str.list[0].clone() //use the first phrase
    } else if (typeof str === 'string') {
      phrase = tokenize(str, this.world, this.pool())[0] //assume it's one sentence, for now
    }
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
exports.concat = function () {
  // clear the cache
  this.uncache()
  let list = this.list.slice(0)
  //repeat for any number of params
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]
    //support a fresh string
    if (typeof arg === 'string') {
      let arr = tokenize(arg, this.world)
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

/** fully remove these terms from the document */
exports.delete = function (match) {
  // clear the cache
  this.uncache()
  let toRemove = this
  if (match) {
    toRemove = this.match(match)
  }
  toRemove.list.forEach(phrase => phrase.delete(this))
  return this
}
// aliases
exports.remove = exports.delete
