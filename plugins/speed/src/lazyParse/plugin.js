import maybeMatch from './maybeMatch.js'
import lazyParse from './lazyParse.js'

export default {
  api: function (View) {
    View.prototype.maybeMatch = maybeMatch
  },
  lib: {
    lazyParse
  }
}