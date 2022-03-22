import addPossessives from './possessives/index.js'
import addParentheses from './parentheses/index.js'
import addQuotations from './quotations/index.js'
import addAcronyms from './acronyms/index.js'
import addAdverbs from './adverbs/index.js'
import addSelections from './selections/index.js'

export default {
  api: function (View) {
    addSelections(View)
    addPossessives(View)
    addParentheses(View)
    addQuotations(View)
    addAdverbs(View)
    addAcronyms(View)
  }
}