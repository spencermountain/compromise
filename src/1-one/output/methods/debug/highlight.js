/* eslint-disable no-console */
import cli from './_color.js'

const split = (txt, offset, index) => {
  const buff = index * 9 //there are 9 new chars addded to each highlight
  const start = offset.start + buff
  const end = start + offset.length
  const pre = txt.substring(0, start)
  const mid = txt.substring(start, end)
  const post = txt.substring(end, txt.length)
  return [pre, mid, post]
}

const spliceIn = function (txt, offset, index) {
  const parts = split(txt, offset, index)
  return `${parts[0]}${cli.blue(parts[1])}${parts[2]}`
}

const showHighlight = function (doc) {
  if (!doc.found) {
    return
  }
  const bySentence = {}
  doc.fullPointer.forEach(ptr => {
    bySentence[ptr[0]] = bySentence[ptr[0]] || []
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
