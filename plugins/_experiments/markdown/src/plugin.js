// import { convertToHtml, parseHtml, printHtml } from './html/index.js'
// import { convertToMd, parseMd, printMd } from './md/index.js'
// import { fromMarkdown } from 'mdast-util-from-markdown'
import parse from './parse/index.js'

import toPlaintexts from './parse/toPlaintext.js'
import { visit } from 'unist-util-visit'

const cleanup = function (tree) {
  let n = 0
  visit(tree, null, (node) => {
    node.id = String(n)
    n += 1
    delete node.position
  })
  return tree
}


export default {
  lib: {
    fromMarkdown: function (md = '') {
      let tree = parse(md)
      tree = cleanup(tree)
      // console.dir(tree, { depth: 8 })
      return toPlaintexts(tree)
    }
  }
}