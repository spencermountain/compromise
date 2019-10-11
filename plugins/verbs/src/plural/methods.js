const parseVerb = require('../parse')
const isPlural = require('./isPlural')

/** */
exports.isPlural = function() {
  let list = []
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    if (isPlural(parsed, this.world) === true) {
      list.push(vb.list[0])
    }
  })
  return this.buildFrom(list)
}
/** */
exports.isSingular = function() {
  let list = []
  this.forEach(vb => {
    let parsed = parseVerb(vb)
    if (isPlural(parsed, this.world) === false) {
      list.push(vb.list[0])
    }
  })
  return this.buildFrom(list)
}
