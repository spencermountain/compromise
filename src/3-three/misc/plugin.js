import addAcronyms from './acronyms/index.js'
import addAdjectives from './adjectives/index.js'
import addAdverbs from './adverbs/index.js'
import addParentheses from './parentheses/index.js'
import addPossessives from './possessives/index.js'
import addProunouns from './pronouns/index.js'
import addQuotations from './quotations/index.js'
import addSelections from './selections/index.js'

export default {
  api: function (View) {
    addAcronyms(View)
    addAdjectives(View)
    addAdverbs(View)
    addParentheses(View)
    addPossessives(View)
    addProunouns(View)
    addQuotations(View)
    addSelections(View)
  }
}