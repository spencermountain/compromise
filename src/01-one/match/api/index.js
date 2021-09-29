import match from './match.js'
import lookaround from './lookaround.js'

const methods = Object.assign({}, match, lookaround)

// aliases
methods.lookBehind = methods.before
methods.lookAhead = methods.after

const matchAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default matchAPI
