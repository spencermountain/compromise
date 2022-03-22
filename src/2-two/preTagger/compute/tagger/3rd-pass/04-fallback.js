import fastTag from '../_fastTag.js'
import fillTag from './_fillTags.js'


const nounFallback = function (terms, i, model) {
  if (terms[i].tags.size === 0) {
    fastTag(terms[i], 'Noun', '3-[fallback]')
    // try to give it singluar/plural tags, too
    fillTag(terms, i, model)
    terms[i].confidence = 0.1
  }
}
export default nounFallback
