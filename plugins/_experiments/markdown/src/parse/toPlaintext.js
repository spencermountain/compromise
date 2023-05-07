// import { depthFirst, breadthFirst } from './crawl.js'
import { visit } from 'unist-util-visit'
// import uuid from './uuid.js'


const shouldBreak = {
  heading: true,
  paragraph: true,
  code: true,
  thematicBreak: true,
  blockquote: true,
  break: true,
  image: true,
  table: true,
  tableRow: true,
  tableCell: true
}
const skipText = {
  code: true
}

const toPlaintext = function (tree) {
  let texts = []
  let current = ''
  let startId = null
  visit(tree, null, (node) => {
    // n += 1
    // node.id = node.type + '|' + uuid(n)
    // console.log(node/.type, '|', node.value)
    if (current && shouldBreak[node.type]) {
      texts.push({
        startId,
        txt: current,
      })
      current = ''
      startId = null
    }
    if (node.value && !skipText[node.type]) {
      startId = startId || node.id
      current += node.value
    }
  })
  // add last one
  if (current) {
    texts.push({
      startId,
      txt: current,
    })
  }
  return texts
}
export default toPlaintext