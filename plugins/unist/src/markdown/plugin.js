import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import version from '../_version.js'
import readTree from './read-tree/index.js'
import onTransfer from './on-transfer.js'
import writeTree from './update-tree/index.js'
import debugAst from './debug.js'

const plugin = {
  version,
  onReplace: onTransfer,
  mutate: world => {
    world.methods.one.debug ||= {}
    world.methods.one.debug.ast = debugAst
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
    // write our terms back to the tree
    View.prototype.updateTree = function () {
      return writeTree(this)
    }
    // Serialize back to markdown
    View.prototype.markdown = function () {
      const tree = this.document.unist?.tree
      return toMarkdown(tree)
    }
  },
}

export default plugin
