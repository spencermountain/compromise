const findVerbs = function (doc) {
  let m = doc.match('{Verb}')

  m = m.splitAfter('@hasComma')
  //ensure there's actually a verb
  m = m.if('#Verb')

  // the reason he will is ...
  // ensure it's not two verbs

  return m
}
export default findVerbs
