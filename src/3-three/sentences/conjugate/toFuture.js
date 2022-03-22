const toFuture = function (s) {
  let verbs = s.verbs()
  // translate the first verb, no-stress
  let first = verbs.eq(0)
  first.toFutureTense()
  s = s.fullSentence()
  verbs = s.verbs()//re-do it
  // verbs.debug()
  // force agreement with any 2nd/3rd verbs:
  if (verbs.length > 1) {
    verbs = verbs.slice(1)
    // remove any sorta infinitive - 'to engage'
    verbs = verbs.filter((v) => !v.lookBehind('to$').found)
    // verbs.debug()
    // otherwise, I guess so?
    if (verbs.found) {
      verbs.verbs().toInfinitive()
    }
  }
  // s = s.fullSentence()
  // s.compute('chunks')
  return s
}
export default toFuture