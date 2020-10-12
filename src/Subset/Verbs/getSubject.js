// who/what is doing this verb?
// get the prior verb most-likely doing this action
// (it can not-exist - 'close the door')
const getSubject = function (vb) {
  let lastNoun = vb.lookBehind().nouns(null, { keep_anaphora: true }).last()
  return lastNoun
}
module.exports = getSubject
