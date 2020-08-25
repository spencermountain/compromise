const conjugate = require('./conjugate')

// 'i could drive' -> 'i could have driven'
// if something is 'modal-ish' we are forced to use past-participle
// ('i could drove' is wrong)
const useParticiple = function (parsed) {
  if (parsed.auxiliary.has('(could|should|would|may|can|must)')) {
    return true
  }
  return false
}

// conjugate 'drive' ➔ 'have driven'
const toParticiple = function (parsed, world) {
  let obj = conjugate(parsed, world)
  let str = obj.Participle || obj.PastTense
  if (str) {
    parsed.verb.replaceWith(str, false)
  }
  parsed.auxiliary.append('have')
  // tag it as a participle
  parsed.verb.tag('Participle', 'toParticiple')
  // turn 'i can swim' to -> 'i could swim'
  parsed.auxiliary.replace('can', 'could')
  //'must be' ➔ 'must have been'
  parsed.auxiliary.replace('be have', 'have been')
  //'not have' ➔ 'have not'
  parsed.auxiliary.replace('not have', 'have not')
}

module.exports = {
  useParticiple: useParticiple,
  toParticiple: toParticiple,
}
