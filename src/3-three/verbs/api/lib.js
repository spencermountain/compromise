import getSubject from './parse/getSubject.js'

const noop = vb => vb

const isPlural = (vb, parsed) => {
  let subj = getSubject(vb, parsed)
  let m = subj.subject
  if (m.has('i') || m.has('we')) {
    return true
  }
  return subj.plural
}

// present-tense copula
const isAreAm = function (vb, parsed) {
  // 'people were' -> 'people are'
  if (vb.has('were')) {
    return 'are'
  }
  // 'i was' -> i am
  let { subject, plural } = getSubject(vb, parsed)
  if (subject.has('i')) {
    return 'am'
  }
  if (subject.has('we') || plural) {
    return 'are'
  }
  // 'he was' -> he is
  return 'is'
}


const doDoes = function (vb, parsed) {
  let subj = getSubject(vb, parsed)
  let m = subj.subject
  if (m.has('i') || m.has('we')) {
    return 'do'
  }
  if (subj.plural) {
    return 'do'
  }
  return 'does'
}

const toInf = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text({ keepPunct: false })
  str = verbToInfinitive(str, vb.model)
  if (str) {
    vb.replace(parsed.root, str)
  }
  return vb
}


const getTense = function (m) {
  if (m.has('#Participle')) {
    return 'Participle'
  }
  if (m.has('#PastTense')) {
    return 'PastTense'
  }
  if (m.has('#Gerund')) {
    return 'Gerund'
  }
  if (m.has('#PresentTense')) {
    return 'PresentTense'
  }
  return undefined
}

export { noop, isPlural, isAreAm, doDoes, toInf, getSubject, getTense }