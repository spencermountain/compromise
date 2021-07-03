const textOut = function () {
  let text = ''
  let perfect = true
  if (this.pointer) {
    perfect = false
  }
  this.docs.forEach((terms, i) => {
    let txt = ''
    terms.forEach(t => {
      txt += t.pre + t.text + t.post
    })
    text += txt
  })
  if (perfect === false) {
    text = text.trimEnd()
  }
  return text
}
export default textOut
