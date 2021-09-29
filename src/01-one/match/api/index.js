import match from './match.js'

const matchAPI = function (View) {
  Object.assign(View.prototype, match)
}
export default matchAPI
