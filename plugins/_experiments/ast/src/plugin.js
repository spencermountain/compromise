import toAst from './ast.js'
import toLines from './lines.js'
import compute from './compute/index.js'



export default {
  compute,

  api: function (View) {

    View.prototype.lines = function () {
      return toLines(this)
    }


    View.prototype.ast = function (opts) {
      return toAst(this, opts)
    }
  }
}