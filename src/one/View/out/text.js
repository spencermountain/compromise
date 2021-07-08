const trimEnd = /[,:;).?! ]+$/
const trimStart = /^[('" ]+/

const textFromTerms = function (terms, perfect) {
  let txt = ''
  terms.forEach(t => {
    txt += t.pre + t.text + t.post
  })
  if (perfect === false) {
    txt = txt.replace(trimStart, '')
    txt = txt.replace(trimEnd, '')
  }
  return txt
}

const textFromDoc = function (docs, perfect) {
  let text = ''
  docs.forEach(terms => {
    text += textFromTerms(terms, true) //internally perfect
  })
  if (perfect === false) {
    text = text.replace(trimStart, '')
    text = text.replace(trimEnd, '')
  }
  return text
}
export { textFromDoc, textFromTerms }
