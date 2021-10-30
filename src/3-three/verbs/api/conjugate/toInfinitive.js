// all verb forms are the same
const toPresent = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  parsed.root.freeze()
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  if (str) {
    vb.replace(parsed.root, str)
  }
  // remove any auxiliary
  if (parsed.auxiliary.found) {
    parsed.auxiliary.terms().forEach(m => {
      vb.remove(m.text('normal')) //super awkward
    })
  }
  return vb.tag('Verb')
}
export default toPresent
