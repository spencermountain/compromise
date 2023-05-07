import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table'
// import { frontmatterFromMarkdown, frontmatterToMarkdown } from 'mdast-util-frontmatter'

const parseMd = function (md) {
  const tree = fromMarkdown(md, {
    extensions: [gfmTable],
    mdastExtensions: [gfmTableFromMarkdown]
  })
  return tree

}
export default parseMd