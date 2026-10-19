import { fromHtml } from 'hast-util-from-html'
import { toHtml } from 'hast-util-to-html'
import { format } from 'hast-util-format'
import version from './_version.js'
import readTree from './read-tree/index.js'
import onTransfer from './on-transfer.js'
import writeTree from './update-tree/index.js'
import debugAst from './debug.js'

const plugin = {
  version,
  onReplace: onTransfer,
  mutate: world => {
    world.methods.one.debug ||= {}
    const previous = world.methods.one.debug.ast
    world.methods.one.debug.ast = view => {
      if (view.document.htmlAst || !previous) {
        return debugAst(view)
      }
      return previous(view)
    }
  },
  lib: {
    fromHast: function (tree, options = {}) {
      return readTree(tree, this, options)
    },
    fromHtml: function (input, options = {}) {
      // Fragment mode avoids adding html/head/body wrappers to snippets.
      const tree = fromHtml(input, { fragment: options.fragment ?? true })
      return readTree(tree, this, options)
    },
  },
  api: View => {
    View.prototype.html = function (options = {}) {
      const binding = this.document.htmlAst
      if (!binding) {
        throw new Error('This document is not connected to an HTML tree')
      }
      if (options.format) {
        // Formatting changes whitespace nodes; keep those changes out of our bindings.
        const tree = globalThis.structuredClone(binding.tree)
        format(tree)
        return toHtml(tree)
      }
      return toHtml(binding.tree)
    }
    View.prototype.updateHast = function () {
      return writeTree(this)
    }
  },
}

export default plugin
