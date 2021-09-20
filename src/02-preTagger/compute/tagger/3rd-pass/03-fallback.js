import fastTag from '../_fastTag.js'

const nounFallback = function (terms, i) {
  if (terms[i].tags.size === 0) {
    fastTag(terms[i], 'Noun', '3-noun-fallback')
  }
}
export default nounFallback
