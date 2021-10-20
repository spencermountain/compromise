const parse = require('../parse')

/** he walks -> he did not walk */
exports.toNegative = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toNegative()
    obj.verb.replaceWith(vb, false)
  })
  return this
}
/** he doesn't walk -> he walks */
exports.toPositive = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toPositive()
    obj.verb.replaceWith(vb, false)
  })
  return this
}
