const trailSpace = /\s+$/

const toText = function (term) {
  let pre = term.pre || ''
  let post = term.post || ''
  return pre + term.text + post
}

const html = function (obj) {
  // index ids to highlight
  let starts = {}
  Object.keys(obj).forEach(k => {
    let ptrs = obj[k].fullPointer
    ptrs.forEach(a => {
      starts[a[3]] = { tag: k, end: a[2] }
    })
  })
  // create the text output
  let out = ''
  this.docs.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      let t = terms[i]
      // do a span tag
      if (starts.hasOwnProperty(t.id)) {
        let { tag, end } = starts[t.id]
        out += `<span class="${tag}">`
        for (let k = i; k < end; k += 1) {
          out += toText(terms[k])
        }
        // move trailing whitespace after tag
        let after = ''
        out = out.replace(trailSpace, (a) => {
          after = a
          return ''
        })
        out += `</span>${after}`
        i = end - 1
      } else {
        out += toText(t)
      }
    }
  })
  return out
}
export default { html }