const toPast = function (s, parsed) {
  let verbs = s.verbs()

  // already past
  if (verbs.has('#PastTense')) {
    return s
  }

  // translate the first verb, no-stress
  let first = verbs.eq(0)
  first.toPastTense()

  // force agreement with any 2nd/3rd verbs:
  if (verbs.length > 1) {
    verbs = verbs.slice(1)
    // remove any sorta infinitive - 'to engage'
    verbs = verbs.filter((v) => !v.lookBehind('to$').found)
    // keep -ing verbs
    verbs = verbs.if('#PresentTense')
    verbs = verbs.if('!#Gerund')

    //run-on infinitive-list - 'to walk, sit and eat'
    let list = s.match('to #Verb+ #Conjunction #Verb').terms()
    verbs = verbs.not(list)

    // otherwise, I guess so?
    if (verbs.found) {
      verbs.verbs().toPastTense()
    }
  }

  s.compute('chunks')
  return s
}
export default toPast