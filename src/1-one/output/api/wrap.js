const toText = function (term) {
  const pre = term.pre || ''
  const post = term.post || ''
  return pre + term.text + post
}

const findStarts = function (doc, obj) {
  const starts = {}
  Object.keys(obj).forEach(reg => {
    const m = doc.match(reg)
    m.fullPointer.forEach(a => {
      starts[a[3]] = { fn: obj[reg], end: a[2] }
    })
  })
  return starts
}

const wrap = function (doc, obj) {
  // index ids to highlight
  const starts = findStarts(doc, obj)
  let text = ''
  doc.docs.forEach((terms, n) => {
    for (let i = 0; i < terms.length; i += 1) {
      const t = terms[i]
      // do a span tag
      if (starts.hasOwnProperty(t.id)) {
        const { fn, end } = starts[t.id]
        const m = doc.update([[n, i, end]])
        text += terms[i].pre || ''
        text += fn(m)
        i = end - 1
        text += terms[i].post || ''
      } else {
        text += toText(t)
      }
    }
  })
  return text
}
export default wrap