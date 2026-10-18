/* eslint-disable no-console */
import { blue } from '../../../../API/_color.js'

const spliceIn = (txt, offset, index) => {
  const start = offset.start + index * 9 // Each highlight adds nine ANSI characters.
  const end = start + offset.length
  return txt.substring(0, start) + blue(txt.substring(start, end)) + txt.substring(end)
}

const showHighlight = function (doc) {
  if (!doc.found) {
    return
  }
  const bySentence = {}
  doc.fullPointer.forEach(ptr => {
    bySentence[ptr[0]] ||= []
    bySentence[ptr[0]].push(ptr)
  })
  Object.keys(bySentence).forEach(k => {
    const full = doc.update([[Number(k)]])
    let txt = full.text()
    const matches = doc.update(bySentence[k])
    const json = matches.json({ offset: true })
    json.forEach((obj, i) => {
      txt = spliceIn(txt, obj.offset, i)
    })
    console.log(txt)
  })
  console.log('\n')
}
export default showHighlight
