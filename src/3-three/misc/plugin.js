import addPossessives from './possessives/index.js'
import addParentheses from './Parentheses/index.js'
import addQuotations from './quotations/index.js'

export default {
  api: function (View) {
    addPossessives(View)
    addParentheses(View)
    addQuotations(View)
  }
}