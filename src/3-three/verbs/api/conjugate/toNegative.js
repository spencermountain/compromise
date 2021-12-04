//vaguely, turn 'he is cool' into 'he is not cool'
const forms = {
}
const toNegative = function (vb, parsed, form) {
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['lexicon', 'preTagger', 'postTagger', 'chunks'])
    return vb
  }
  // do nothing i guess?
  return vb
}
export default toNegative