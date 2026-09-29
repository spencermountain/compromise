const isClass = /^\../
const isId = /^#./

const escapeXml = str => {
  str = str.replaceAll('&', '&amp;')
  str = str.replaceAll('<', '&lt;')
  str = str.replaceAll('>', '&gt;')
  str = str.replaceAll('"', '&quot;')
  str = str.replaceAll("'", '&apos;')
  return str
}

// interpret .class, #id, tagName
const toTag = function (k) {
  let start = ''
  let end = '</span>'
  k = escapeXml(k)
  if (isClass.test(k)) {
    start = `<span class="${k.replace(/^\./, '')}"`
  } else if (isId.test(k)) {
    start = `<span id="${k.replace(/^#/, '')}"`
  } else {
    start = `<${k}`
    end = `</${k}>`
  }
  start += '>'
  return { start, end }
}

const getIndex = function (doc, obj) {
  const starts = {}
  const ends = {}
  Object.keys(obj).forEach(k => {
    let res = obj[k]
    const tag = toTag(k)
    if (typeof res === 'string') {
      res = doc.match(res)
    }
    res.docs.forEach(terms => {
      // don't highlight implicit terms
      if (terms.every(t => t.implicit)) {
        return
      }
      const a = terms[0].id
      starts[a] ||= []
      starts[a].push(tag.start)
      const b = terms.at(-1).id
      ends[b] ||= []
      ends[b].push(tag.end)
    })
  })
  return { starts, ends }
}

const html = function (obj) {
  // index ids to highlight
  const { starts, ends } = getIndex(this, obj)
  // create the text output
  let out = ''
  this.docs.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const t = terms[i]
      // do a span tag
      if (Object.hasOwn(starts, t.id)) {
        out += starts[t.id].join('')
      }
      out += t.pre || ''
      out += t.text || ''
      if (Object.hasOwn(ends, t.id)) {
        out += ends[t.id].join('')
      }
      out += t.post || ''
    }
  })
  return out
}
export default { html }
