import getSubject from '../../parse/subject/index.js'

const noop = vb => vb

const simple = (vb, parsed) => {}

const forms = {
  'simple-present': () => {},
  'simple-past': noop,
  'simple-future': () => {},

  'present-progressive': () => {},
  'past-progressive': () => {},
  'future-progressive': () => {},

  'present-perfect': () => {},
  'past-perfect': () => {},
  'future-perfect': () => {},

  'present-perfect-progressive': () => {},
  'past-perfect-progressive': () => {},
  'future-perfect-progressive': () => {},

  'passive-past': noop,
  'passive-present': () => {},
  'passive-future': () => {},

  'present-conditional': () => {},
  'past-conditional': () => {},

  'auxiliary-future': () => {},
  'auxiliary-past': noop,
  'auxiliary-present': () => {},
  'modal-infinitive': () => {},
  'modal-past': noop,
  'want-infinitive': () => {},
}

const killAuxiliaries = function () {}

const toPresent = function (vb, parsed) {
  const { model, methods } = vb
  const { verbConjugate, verbToInfinitive } = methods.two.transform
  // don't conjugate 'go away'.
  // if (parsed.root.has('#Imperative')) {
  //   return vb
  // }
  // // past->present (conjugate)
  // if (parsed.root.has('#PastTense')) {
  //   let str = parsed.root.text('normal')
  //   str = verbToInfinitive(str, model)

  //   let subj = getSubject(vb, parsed)
  //   if (subj.plural === true) {
  //     str = verbConjugate(str, model).PresentTense
  //   }
  //   vb = vb.replace(parsed.root, str)
  //   return vb
  // }
  return vb
}
export default toPresent
