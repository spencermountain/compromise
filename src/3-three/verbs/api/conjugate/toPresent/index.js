import getSubject from '../../parse/subject/index.js'

const killAuxiliaries = function () {}

const toPresent = function (vb, parsed) {
  const { model, methods } = vb
  const { verbConjugate, verbToInfinitive } = methods.two.transform
  // don't conjugate 'go away'.
  if (parsed.root.has('#Imperative')) {
    return vb
  }
  // past->present (conjugate)
  if (parsed.root.has('#PastTense')) {
    let str = parsed.root.text('normal')
    str = verbToInfinitive(str, model)

    let subj = getSubject(vb, parsed)
    if (subj.plural === true) {
      str = verbConjugate(str, model).PresentTense
    }
    vb = vb.replace(parsed.root, str)
    return vb
  }
  return vb
}
export default toPresent
