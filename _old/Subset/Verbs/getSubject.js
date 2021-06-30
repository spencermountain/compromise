// who/what is doing this verb?
// get the prior verb most-likely doing this action
// (it can not-exist - 'close the door')
const getSubject = function (vb) {
  let behind = vb.lookBehind()
  let lastNoun = behind.nouns(null, { keep_anaphora: true }).last()

  // support 'that' and 'this'
  if (!lastNoun.found) {
    lastNoun = behind.match('(that|this|each)').last()
    lastNoun = lastNoun.tag('#Noun').nouns()
  }
  return lastNoun
}
module.exports = getSubject
