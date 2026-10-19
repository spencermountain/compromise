import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import version from '../_version.js'
import { documents, bind, transfer } from './_bindings.js'
import collect from './_tree.js'
import { getBinding, update } from './_update.js'

const plugin = {
  version,
  onReplace: transfer,
  lib: {
    fromAst: function (tree, options = {}) {
      if (tree.type === 'root' && tree.children.length > 1) {
        throw new Error('The Markdown proof of concept supports one prose block')
      }
      const nodes = collect(tree)
      // Join before tokenizing so inline markup cannot split a word or a match.
      const doc = this.tokenize(nodes.map(node => node.value).join(''))
      // Establish source ownership before running the full tagging pipeline.
      bind(doc, nodes)
      documents.set(doc.document, { tree, nodes, values: nodes.map(node => node.value), stringify: options.stringify || toMarkdown })
      doc.compute(this.hooks())
      return doc
    },
    fromMarkdown: function (md, options = {}) {
      const parse = options.parse || fromMarkdown
      return this.fromAst(parse(md), options)
    },
  },
  api: View => {
    View.prototype.updateTree = function () {
      return update(this)
    }
    View.prototype.markdown = function () {
      const { tree, stringify } = getBinding(this)
      if (!stringify) {
        throw new Error('markdown requires a Markdown stringify callback')
      }
      // Serialize the last successfully updated tree; this does not apply pending edits.
      return stringify(tree)
    }
  },
}

export default plugin
