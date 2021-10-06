import getSubject from '../../parse/subject/index.js'

const noop = vb => vb

const simple = (vb, parsed) => {
  const { verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  if (str) {
    vb = vb.replace(parsed.root, str)
  }
  vb.prepend('will')
  vb.remove(parsed.auxiliary)
  return vb
}

// 'will be walking'
const progressive = (vb, parsed) => {
  const { verbConjugate, verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  if (str) {
    str = verbConjugate(str, vb.model).Gerund
    vb = vb.replace(parsed.root, str)
  }
  vb.prepend('will be')
  vb.remove(parsed.auxiliary)
  return vb
}

const forms = {
  // he walks ->
  'simple-present': simple,
  // he walked
  'simple-past': simple,
  // he will walk ->
  'simple-future': noop,

  // is walking ->
  'present-progressive': progressive,
  // was walking ->
  'past-progressive': progressive,
  // will be walking ->
  'future-progressive': noop,

  // has walked ->
  'present-perfect': noop,
  // had walked ->
  'past-perfect': noop,
  // will have walked ->
  'future-perfect': noop,

  // has been walking
  'present-perfect-progressive': noop,
  // had been walking
  'past-perfect-progressive': noop,
  // will have been ->
  'future-perfect-progressive': noop,

  // got walked ->
  // was walked ->
  // had been walked ->
  'passive-past': noop,
  // is being walked  ->
  'passive-present': noop,
  // will be walked ->
  'passive-future': noop,
  // would be walked ->
  'present-conditional': noop,
  // would have been walked ->
  'past-conditional': noop,

  // is going to drink ->
  'auxiliary-future': noop,
  // used to walk -> is walking
  // did walk -> is walking
  'auxiliary-past': noop,
  // we do walk ->
  'auxiliary-present': noop,

  // must walk ->
  'modal-infinitive': noop,
  // must have walked
  'modal-past': noop,
}

const toFuture = function (vb, parsed, form) {
  console.log(form)
  if (forms.hasOwnProperty(form)) {
    return forms[form](vb, parsed)
  }
  return vb
}
export default toFuture
