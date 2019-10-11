const parseVerb = require('../parse')
const conjugate = require('./conjugate')
const toInfinitive = require('./toInfinitive')

/**  */
exports.conjugations = function() {
  let result = []
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    let forms = conjugate(parsed, this.world)
    result.push(forms)
  })
  return result
}
/** */
exports.toPastTense = function() {
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    let str = conjugate(parsed, this.world).PastTense
    vb.replace(str)
  })
  return this
}
/** */
exports.toPresentTense = function() {
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    let str = conjugate(parsed, this.world).PresentTense
    vb.replace(str)
  })
  return this
}
/** */
exports.toFutureTense = function() {
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    let inf = toInfinitive(parsed, this.world)
    vb.replace('will ' + inf) //not smart.
  })
  return this
}
/** */
exports.toInfinitive = function() {
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    let inf = toInfinitive(parsed, this.world)
    vb.replace(inf)
  })
  return this
}
/** */
exports.toGerund = function() {
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    let str = conjugate(parsed, this.world).Gerund
    vb.replace(str)
  })
  return this
}
/** */
// exports.asAdjective=function(){}
