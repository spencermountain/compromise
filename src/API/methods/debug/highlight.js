/* eslint-disable no-console */
import cli from './_color.js'

const split = (txt, offset) => {
  let pre = txt.substring(0, offset.start)
  let mid = txt.substring(offset.start, offset.start + offset.length)
  let post = txt.substring(offset.start + offset.length, txt.length)
  return [pre, mid, post]
}

const showHighlight = function (m) {
  let doc = m.sentences()
  if (!m.found || doc.wordCount() === m.wordCount()) {
    return
  }
  doc.compute('offset')
  let json = m.json({ offset: true })
  // highlight matches
  json.forEach(res => {
    let parts = split(doc.text(), res.offset)
    let out = `${parts[0]}${cli.blue(parts[1])}${parts[2]}`
    console.log(out)
  })
}
export default showHighlight
