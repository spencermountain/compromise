import multiWord from './multi-word.js'
import singleWord from './single-word.js'
import eachTerm from '../../tokenize/compute/_lib.js'

// tag any words in our lexicon - even if it hasn't been filled-up yet
// rest of pre-tagger is in ./two/preTagger
const lexicon = function (view) {
  const world = view.world
  // loop through our terms
  eachTerm(view.docs, (term, terms, i) => {
    if (term.tags.size === 0) {
      let found = null
      found ||= multiWord(terms, i, world)
      // lookup known words
      found ||= singleWord(terms, i, world)
    }
  })
}

export default {
  lexicon,
}
