import version from './_version.js'
import toAst from './toAst/index.js'
import fromAst from './fromAst/index.js'

export default {
  version,
  lib: { fromAst },
  api: function (View) {
    // turn compromise document into nlcst AST
    View.prototype.toAst = function (options) {
      return toAst(this, options)
    }
  },
}
