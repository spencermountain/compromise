import getSubject from './parse/getSubject.js'

const noop = vb => vb

const isPlural = (vb, parsed) => {
  const subj = getSubject(vb, parsed)
  const m = subj.subject
  if (m.has('i') || m.has('we')) {
    return true
  }
  return subj.plural
}

const wasWere = (vb, parsed) => {
  const { subject, plural } = getSubject(vb, parsed)
  if (plural || subject.has('(we|you)')) {
    return 'were'
  }
  return 'was'
}

// present-tense copula
const isAreAm = function (vb, parsed) {
  // 'people were' -> 'people are'
  if (vb.has('were')) {
    return 'are'
  }
  // 'i was' -> i am
  const { subject, plural } = getSubject(vb, parsed)
  if (subject.has('i')) {
    return 'am'
  }
  if (subject.has('(we|you)') || plural) {
    return 'are'
  }
  // 'he was' -> he is
  return 'is'
}


const doDoes = function (vb, parsed) {
  const subj = getSubject(vb, parsed)
  const m = subj.subject
  if (m.has('(i|we|you)')) {
    return 'do'
  }
  if (subj.plural) {
    return 'do'
  }
  return 'does'
}

const haveHas = function (vb, parsed) {
  const subj = getSubject(vb, parsed)
  const m = subj.subject
  if (m.has('(i|we|you)')) {
    return 'have'
  }
  // the dog has
  if (subj.plural === false) {
    return 'has'
  }
  // spencer has
  if (m.has('he') || m.has('she') || m.has('#Person')) {
    return 'has'
  }
  return 'have'
}

// Replace the finite future auxiliary in place, preserving negation and adverbs.
const toPerfectAuxiliary = (vb, auxiliary) => {
  vb.remove('have')
  vb.replace('will', auxiliary)
  return vb
}

const getTense = function (m) {
  if (m.has('#Infinitive')) {
    return 'Infinitive'
  }
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

const toInf = function (vb, parsed) {
  const { toInfinitive } = vb.methods.two.transform.verb
  let str = parsed.root.text({ keepPunct: false })
  str = toInfinitive(str, vb.model, getTense(vb))
  if (str) {
    vb.replace(parsed.root, str)
  }
  return vb
}



// i will start looking -> i started looking
// i will not start looking -> i did not start looking
const noWill = (vb) => {
  if (vb.has('will not')) {
    return vb.replace('will not', 'have not')
  }
  return vb.remove('will')
}

export { noop, isPlural, isAreAm, doDoes, toInf, getSubject, getTense, wasWere, noWill, haveHas, toPerfectAuxiliary }
