const parse = require('../parse')

/** he walks -> he walked */
exports.toPastTense = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toPastTense()
    obj.verb.replaceWith(vb, false, true)
  })
  return this
}
/** he walked -> he walks */
exports.toPresentTense = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toPresentTense()
    obj.verb.replaceWith(vb, false, true)
  })
  return this
}
/** he walks -> he will walk */
exports.toFutureTense = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toFutureTense()
    obj.verb.replaceWith(vb, false, true)
  })
  return this
}

// toContinuous() {
//   return this
// }
