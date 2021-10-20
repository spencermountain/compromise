const conjugate = require('./conjugate')

// 'i could drive' -> 'i could have driven'
// if something is 'modal-ish' we are forced to use past-participle
// ('i could drove' is wrong)
const useParticiple = function (parsed) {
  if (parsed.auxiliary.has('(could|should|would|may|can|must)')) {
    return true
  }
  if (parsed.auxiliary.has('am .+? being')) {
    return true
  }
  if (parsed.auxiliary.has('had .+? been')) {
    return true
  }
  return false
}

// conjugate 'drive' ➔ 'have driven'
const toParticiple = function (parsed, world) {
  //is it already a participle?
  if (parsed.auxiliary.has('(have|had)') && parsed.verb.has('#Participle')) {
    return
  }
  // try to swap the main verb to its participle form
  let obj = conjugate(parsed, world)
  let str = obj.Participle || obj.PastTense
  if (str) {
    parsed.verb.replaceWith(str, false)
  }
  // 'am being driven' ➔ 'have been driven'
  if (parsed.auxiliary.has('am .+? being')) {
    parsed.auxiliary.remove('am')
    parsed.auxiliary.replace('being', 'have been')
  }

  // add a 'have'
  if (!parsed.auxiliary.has('have')) {
    parsed.auxiliary.append('have')
  }
  // tag it as a participle
  parsed.verb.tag('Participle', 'toParticiple')
  // turn 'i can swim' to -> 'i could swim'
  parsed.auxiliary.replace('can', 'could')
  //'must be' ➔ 'must have been'
  parsed.auxiliary.replace('be have', 'have been')
  //'not have' ➔ 'have not'
  parsed.auxiliary.replace('not have', 'have not')
  // ensure all new words are tagged right
  parsed.auxiliary.tag('Auxiliary')
}

module.exports = {
  useParticiple: useParticiple,
  toParticiple: toParticiple,
}
