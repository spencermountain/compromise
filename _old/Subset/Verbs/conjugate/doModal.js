// 'may/could/should' -> 'may/could/should have'
const doModal = function (parsed) {
  let str = parsed.verb.text()
  let res = {
    PastTense: str + ' have',
    PresentTense: str,
    FutureTense: str,
    Infinitive: str,
    // Gerund: ,
    // Actor: '',
    // PerfectTense: '',
    // Pluperfect: '',
  }
  return res
}
module.exports = doModal
