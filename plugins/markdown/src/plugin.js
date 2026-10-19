import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import { frontmatter } from 'micromark-extension-frontmatter'
import { frontmatterFromMarkdown, frontmatterToMarkdown } from 'mdast-util-frontmatter'
import version from './_version.js'
import readTree from './read-tree/index.js'
import onTransfer from './on-transfer.js'
import writeTree from './update-tree/index.js'
import debugAst from './debug.js'

const matter = ['yaml', 'toml']

const plugin = {
  version,
  onReplace: onTransfer,
  mutate: world => {
    world.methods.one.debug ||= {}
    world.methods.one.debug.ast = debugAst
  },
  lib: {
    fromAst: function (tree, options = {}) {
      return readTree(tree, this, options)
    },
    fromMarkdown: function (md, options = {}) {
      // Parsing is fixed here; callers with another parser can use fromAst().
      const tree = fromMarkdown(md, {
        extensions: [gfm(), frontmatter(matter)],
        mdastExtensions: [gfmFromMarkdown(), frontmatterFromMarkdown(matter)],
      })
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
      return toMarkdown(tree, { extensions: [gfmToMarkdown(), frontmatterToMarkdown(matter)] })
    }
  },
}

export default plugin
