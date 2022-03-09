const isClass = /^\../
const isId = /^#./

const toText = function (term) {
  let pre = term.pre || ''
  let post = term.post || ''
  return pre + term.text + post
}

const toTag = function (k) {
  let start = ''
  let end = '</span>'
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
  let starts = {}
  let ends = {}
  Object.keys(obj).forEach(k => {
    let res = obj[k]
    let tag = toTag(k)
    if (typeof res === 'string') {
      res = doc.match(res)
    }
    res.docs.forEach(terms => {
      starts[terms[0].id] = tag
      ends[terms[terms.length - 1].id] = tag
    })
  })
  return { starts, ends }
}



const html = function (obj) {
  // index ids to highlight
  let { starts, ends } = getIndex(this, obj)
  // create the text output
  let out = ''
  this.docs.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      let t = terms[i]
      // do a span tag
      if (starts.hasOwnProperty(t.id)) {
        out += starts[t.id].start
      }
      if (ends.hasOwnProperty(t.id)) {
        out += t.pre || '' + t.text || ''
        out += ends[t.id].end
        out += t.post || ''
      } else {
        out += toText(t)
      }
    }
  })
  return out
}
export default { html }