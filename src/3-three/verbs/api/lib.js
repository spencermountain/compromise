import getSubject from './parse/getSubject.js'
import { Inf, Participle, Past, Ger, Pres } from '../../../2-two/preTagger/tagSet/_lib.js'

const noop = vb => vb

const isPlural = (vb, parsed) => {
  const subj = getSubject(vb, parsed)
  return subj.subject.has('(i|we|you)') || subj.plural
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


const doDoes = (vb, parsed) => isPlural(vb, parsed) ? 'do' : 'does'

const haveHas = function (vb, parsed) {
  const { subject, plural } = getSubject(vb, parsed)
  if (subject.has('(i|we|you)')) {
    return 'have'
  }
  // the dog has, spencer has
  if (!plural || subject.has('(he|she|#Pers)')) {
    return 'has'
  }
  return 'have'
}

const getTense = m => [Inf, Participle, Past, Ger, Pres].find(t => m.has('#' + t))

// the tense set by emphatic do-support - 'does not walk', 'did not walk'
const doTense = ({ auxiliary, negative }) => {
  if (!negative.found || !auxiliary.has('^(does|did)$')) {
    return null
  }
  return auxiliary.has('did') ? Past : Pres
}

// re-tag the sentence after a change
const retag = vb => vb.fullSentence().compute(['tagger', 'chunks'])

// i will start looking -> i started looking
// i will not start looking -> i did not start looking
const noWill = (vb) => {
  if (vb.has('will not')) {
    return vb.replace('will not', 'have not')
  }
  return vb.remove('will')
}

export { noop, isPlural, isAreAm, doDoes, getSubject, getTense, wasWere, noWill, haveHas, retag, doTense }
