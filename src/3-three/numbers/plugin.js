import fractions from './fractions/api.js'
import numbers from './numbers/api.js'

const api = function (View) {
  fractions(View)
  numbers(View)
}

export default {
  api,
}
