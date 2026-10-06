import fractions from './fractions/api.js'
import numbers from './numbers/api.js'
import money from './money/api.js'

const api = function (View) {
  fractions(View)
  const Numbers = numbers(View)
  money(View, Numbers)
}

export default {
  api
}
