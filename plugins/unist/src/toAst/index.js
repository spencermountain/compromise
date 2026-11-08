import positions from './01-positions.js'
import terms from './02-terms.js'

const blankLine = /\n[\t ]*\n/

const toAst = (view, options = {}) => {
  const make = positions(options.positions !== false)
  const paragraphs = []
  let paragraph = []
  const flushParagraph = () => {
    if (paragraph.length) {
      paragraphs.push(make.parent('ParagraphNode', paragraph))
      paragraph = []
    }
  }
  view.docs.forEach(sentence => {
    let run = []
    const flushSentence = () => {
      if (run.length) {
        paragraph.push(make.parent('SentenceNode', run))
        run = []
      }
    }
    terms(sentence, make, options.tags !== false).forEach(node => {
      if (node.type === 'WhiteSpaceNode' && blankLine.test(node.value.replace(/\r\n?/g, '\n'))) {
        flushSentence()
        paragraph.push(node)
        flushParagraph()
      } else {
        run.push(node)
      }
    })
    flushSentence()
  })
  flushParagraph()
  return make.parent('RootNode', paragraphs)
}
export default toAst
