// return all newline-seperated sections in the document
const toLines = function (doc) {
  const newLine = /\n/
  const lines = [[]]
  // a newline already splits a sentence,
  // so it can only happen at the end of a sentence
  doc.sentences().forEach(s => {
    lines[lines.length - 1].push(s)
    const terms = s.docs[0]
    const end = terms[terms.length - 1]
    if (newLine.test(end.post)) {
      lines.push([])
    }
  })
  // remove an empty last one
  if (lines[lines.length - 1].length === 0) {
    lines.pop()
  }
  return lines
}
export default toLines