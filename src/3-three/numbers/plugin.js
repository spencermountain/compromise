import fractions from './fractions/api.js'
import numbers from './numbers/api.js'
import percentages from './percentages/api.js'

const api = function (View) {
  fractions(View)
  numbers(View)
  percentages(View)
}

export default {
  api,
}
