const conjugate = require('./conjugate')

// 'i could drive' -> 'i could have driven'
// if something is 'model-ish' we are forced to use past-participle
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
    parsed.verb.replaceWith('have ' + str, false)
    // tag it as a participle
    parsed.verb.match('have [*]', 0).tag('Participle', 'toParticiple')
    // turn 'i can swim' to -> 'i could swim'
    if (parsed.auxiliary.has('can')) {
      parsed.auxiliary.replace('can', 'could')
    }
  }
}
module.exports = {
  useParticiple: useParticiple,
  toParticiple: toParticiple,
}
