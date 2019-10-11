const toNegative = require('./toNegative')
const parseVerb = require('../parse')

/** return only verbs with 'not'*/
exports.isNegative = function() {
  return this.if('#Negative')
}

/**  return only verbs without 'not'*/
exports.isPositive = function() {
  return this.ifNo('#Negative')
}

/** add a 'not' to these verbs */
exports.toNegative = function() {
  this.list.forEach(p => {
    let doc = this.buildFrom([p])
    let parsed = parseVerb(doc)
    toNegative(parsed, doc.world)
  })
  return this
}

/** remove 'not' from these verbs */
exports.toPositive = function() {
  return this.remove('#Negative')
}
