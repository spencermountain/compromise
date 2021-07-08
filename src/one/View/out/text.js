const trimEnd = /[,:;).?!]+$/
const trimStart = /^[('"]+/

const textFromTerms = function (terms, keepSpace, keepPunct) {
  let txt = ''
  terms.forEach(t => {
    txt += t.pre + t.text + t.post
  })
  if (keepPunct === false) {
    txt = txt.replace(trimStart, '')
    txt = txt.replace(trimEnd, '')
  }
  if (keepSpace === false) {
    txt = txt.trim()
  }
  return txt
}

const textFromDoc = function (docs, keepSpace, keepPunct) {
  let text = ''
  for (let i = 0; i < docs.length; i += 1) {
    // middle
    text += textFromTerms(docs[i], true, true)
  }
  if (!keepSpace) {
    text = text.trim()
  }
  if (keepPunct === false) {
    text = text.replace(trimStart, '')
    text = text.replace(trimEnd, '')
  }
  return text
}
export { textFromDoc, textFromTerms }
