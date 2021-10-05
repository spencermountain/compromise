// all verb forms are the same
const toPresent = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  // remove any auxiliary
  if (parsed.auxiliary.found) {
    let words = parsed.auxiliary.terms().reverse()
    words.forEach(m => {
      vb = vb.remove(m)
    })
  }
  str = verbToInfinitive(str, vb.model)
  if (str) {
    vb = vb.replace(parsed.root, str)
  }
  return vb
}
export default toPresent
