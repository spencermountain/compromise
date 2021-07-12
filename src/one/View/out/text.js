const trimEnd = /[,:;).?!]+$/
const trimStart = /^[('"]+/

const textFromTerms = function (terms, opts) {
  let txt = ''
  terms.forEach(t => {
    let pre = t.pre || ''
    let post = t.post || ''
    if (opts.cleanWhitespace === true) {
      pre = ''
      post = ' '
    }
    txt += pre + t.text + post
  })
  if (opts.keepPunct === false) {
    txt = txt.replace(trimStart, '')
    txt = txt.replace(trimEnd, '')
  }
  if (opts.keepSpace === false) {
    txt = txt.trim()
  }
  if (opts.lowerCase === true) {
    txt = txt.toLowerCase()
  }

  return txt
}

const textFromDoc = function (docs, opts) {
  let text = ''
  for (let i = 0; i < docs.length; i += 1) {
    // middle
    text += textFromTerms(docs[i], opts)
  }
  if (!opts.keepSpace) {
    text = text.trim()
  }
  if (opts.keepPunct === false) {
    text = text.replace(trimStart, '')
    text = text.replace(trimEnd, '')
  }
  if (opts.cleanWhitespace === true) {
    text = text.trim()
  }
  return text
}
export { textFromDoc, textFromTerms }
