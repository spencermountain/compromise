const trimEnd = /[,:;)\]*.?~!—-]+/
const trimStart = /^[(['"*~]+/

const punctToKill = /[,:;)('"]/
const isHyphen = /^[-–—]$/

const textFromTerms = function (terms, opts, keepSpace = true) {
  let txt = ''
  terms.forEach(t => {
    let pre = t.pre || ''
    let post = t.post || ''

    if (opts.punctuation === 'some') {
      pre = pre.replace(trimStart, '')
      // replace a hyphen with a space
      if (isHyphen.test(post)) {
        post = ' '
      }
      post = post.replace(punctToKill, '')
    }
    if (opts.whitespcae === 'some') {
      pre = pre.replace(/\s/, '') //remove pre-whitespace
      post = post.replace(/\s+/, ' ') //replace post-whitespace with a space
    }
    if (opts.keepPunct === false) {
      pre = pre.replace(trimStart, '')
      if (post === '-') {
        post = ' '
      } else {
        post = post.replace(trimEnd, '')
      }
    }
    // grab the correct word format
    let word = t[opts.use || 'text'] || t.normal || ''
    txt += pre + word + post
  })
  if (keepSpace === false) {
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
    text += textFromTerms(docs[i], opts, true)
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
