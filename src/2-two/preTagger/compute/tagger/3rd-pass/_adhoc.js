const isTitleCase = /^[A-Z][a-z]/

const isCapital = (terms, i) => {
  if (terms[i].tags.has('ProperNoun') && isTitleCase.test(terms[i].text)) {// 'Comfort Inn'
    return 'Noun'
  }
  return null
}

const isAlone = (terms, i, tag) => {
  if (i === 0 && !terms[1]) {// 'Help'
    return tag
  }
  return null
}

// 'a rental'
const isEndNoun = function (terms, i) {
  if (!terms[i + 1] && terms[i - 1] && terms[i - 1].tags.has('Determiner')) {
    return 'Noun'
  }
  return null
}

// the first word in the sentence
const isStart = function (terms, i, tag) {
  if (i === 0 && terms.length > 3) {
    return tag
  }
  return null
}

// A terminal base-form predicate can follow an inverted auxiliary and subject.
// Stop at the subject head: a compound such as 'the bus stop' must not make
// 'stop' a verb when another predicate ('arrive') follows it.
const questionWords = new Set(['why', 'when', 'where', 'how'])
const doForms = new Set(['do', 'does', 'did'])
const isQuestionVerb = (terms, i) => {
  let n = questionWords.has(terms[0].normal) ? 1 : 0
  // Without a wh-word or question mark, 'do the bank transfer' is an instruction.
  if (n === 0 && !terms[terms.length - 1].post.includes('?')) return null
  const auxiliary = terms[n]
  if (!auxiliary || (!doForms.has(auxiliary.normal) && !auxiliary.tags.has('Modal'))) {
    return null
  }
  n += 1
  if (terms[n] && (terms[n].tags.has('Determiner') || terms[n].tags.has('Possessive'))) {
    n += 1
    while (n < i && terms[n].tags.has('Adjective')) n += 1
  }
  if (n >= i || !terms[n].tags.has('Noun')) return null
  n += 1
  while (n < i && (terms[n].tags.has('Adverb') || terms[n].tags.has('Negative'))) n += 1
  if (n !== i) return null
  if (terms.slice(i + 1).some(t => !t.tags.has('Adverb') && !t.tags.has('Date'))) return null
  return 'Infinitive'
}

const adhoc = {
  'Adj|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Noun': (terms, i) => {
    return isCapital(terms, i) || isEndNoun(terms, i)
  },
  'Actor|Verb': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Past': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Present': (terms, i) => {
    return isQuestionVerb(terms, i) || isCapital(terms, i)
  },
  'Noun|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Noun|Verb': (terms, i) => {
    return isQuestionVerb(terms, i) || (i > 0 && isCapital(terms, i)) || isAlone(terms, i, 'Infinitive')
  },
  'Plural|Verb': (terms, i) => {
    return isCapital(terms, i) || isAlone(terms, i, 'PresentTense') || isStart(terms, i, 'Plural')
  },
  'Person|Noun': (terms, i) => {
    return isCapital(terms, i)
  },
  'Person|Verb': (terms, i) => {
    if (i !== 0) {
      return isCapital(terms, i)
    }
    return null
  },
  'Person|Adj': (terms, i) => {
    if (i === 0 && terms.length > 1) {
      return 'Person'
    }
    return isCapital(terms, i) ? 'Person' : null
  },
}
export default adhoc