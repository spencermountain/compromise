import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import version from '../_version.js'
import readTree from './read/index.js'
import transfer from './transfer.js'
import update from './update/index.js'
import debug from './debug.js'

const plugin = {
  version,
  onReplace: transfer,
  mutate: world => {
    world.methods.one.debug ||= {}
    world.methods.one.debug.ast = debug
  },
  lib: {
    fromAst: function (tree) {
      return readTree(tree, this)
    },
    fromMarkdown: function (md, options = {}) {
      const tree = fromMarkdown(md)
      return this.fromAst(tree, options)
    },
  },
  api: View => {
    View.prototype.updateTree = function () {
      return update(this)
    }
    // Serialize back to markdown
    View.prototype.markdown = function () {
      const tree = this.document.unist?.tree
      return toMarkdown(tree)
    }
  },
}

export default plugin
