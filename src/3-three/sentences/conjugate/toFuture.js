const toFuture = function (s) {
  s.verbs(0).toFutureTense()

  // translate the first verb, no-stress

  // s = s.fullSentence()
  // verbs = s.verbs()//re-do it
  // verbs.debug()
  // force agreement with any 2nd/3rd verbs:
  // if (verbs.length > 1) {
  //   verbs = verbs.slice(1)
  //   // remove any sorta infinitive - 'to engage'
  //   verbs = verbs.filter((v) => !v.lookBehind('to$').found)

  //   // verbs.debug()
  //   // otherwise, I guess so?
  //   if (verbs.found) {
  //     verbs.verbs().toFutureTense()
  //   }
  // }

  s = s.fullSentence()
  // s.compute('chunks')
  return s
}
export default toFuture