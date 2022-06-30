import maybeMatch from './maybeMatch.js'
import lazy from './lazyParse.js'

export default {
  api: function (View) {
    View.prototype.maybeMatch = maybeMatch
  },
  lib: {
    lazy
  }
}