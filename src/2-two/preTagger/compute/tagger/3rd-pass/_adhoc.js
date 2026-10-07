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

// An inverted question has one subject head before its terminal predicate.
const questionWords = new Set(['why', 'when', 'where', 'how'])
const doForms = new Set(['do', 'does', 'did'])
const isQuestionVerb = (terms, i) => {
  let n = questionWords.has(terms[0].normal) ? 1 : 0
  if (n === 0 && !terms[terms.length - 1].post.includes('?')) {
    return null
  }
  const auxiliary = terms[n]
  if (!auxiliary || (!doForms.has(auxiliary.normal) && !auxiliary.tags.has('Modal'))) {
    return null
  }
  n += 1
  if (terms[n]?.tags.has('Determiner') || terms[n]?.tags.has('Possessive')) {
    n += 1
    for (; n < i && (terms[n].tags.has('Adjective') || terms[n].tags.has('Adverb')); n += 1) {
      // Skip subject modifiers.
    }
  }
  if (n >= i || !terms[n]?.tags.has('Noun')) {
    return null
  }
  n += 1
  for (; n < i && (terms[n].tags.has('Adverb') || terms[n].tags.has('Negative')); n += 1) {
    // Skip predicate modifiers.
  }
  if (n !== i || terms.slice(i + 1).some(t => !t.tags.has('Adverb') && !t.tags.has('Date'))) {
    return null
  }
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
    // Perfect auxiliaries can be separated from the participle.
    let before = i - 1
    for (; before >= 0; before -= 1) {
      const term = terms[before]
      if (!term.tags.has('Adverb') && !term.tags.has('Negative') && term.normal !== 'since') {
        break
      }
    }
    if (/^(have|has|had)$/.test(terms[before]?.normal)) {
      return 'PastTense'
    }
    return isCapital(terms, i)
  },
  'Adj|Present': (terms, i) => {
    // 'are ready for' and 'are not ready for' describe a state.
    let before = i - 1
    if (terms[before]?.tags.has('Negative')) {
      before -= 1
    }
    if (terms[before]?.tags.has('Copula')) {
      return 'Adjective'
    }
    return  isCapital(terms, i)
  },
  'Noun|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Noun|Verb': (terms, i) => {
    if (terms[i - 1]?.normal === 'even' && terms[i - 2]?.tags.has('Determiner')) {
      return 'Singular'
    }
    return isQuestionVerb(terms, i) || (i > 0 && isCapital(terms, i)) || isAlone(terms, i, 'Infinitive')
  },
  'Plural|Verb': (terms, i) => {
    // A singular demonstrative makes 'this still helps' a predicate.
    const subject = terms[i - 2]?.normal
    if (terms[i - 1]?.normal === 'still' && (subject === 'this' || subject === 'that')) {
      return 'PresentTense'
    }
    return isCapital(terms, i) || isAlone(terms, i, 'PresentTense') || isStart(terms, i, 'Plural')
  },
  'Person|Noun': (terms, i) => {
    // A robin sang; her faith never wavered.
    const before = terms[i - 1]
    if (before?.tags.has('Determiner') || before?.tags.has('Possessive')) {
      return 'Singular'
    }
    // My friend Art arrived; Alfredo handed me the keys.
    if (isTitleCase.test(terms[i].text)) {
      if (i > 0 || (terms[i + 1]?.tags.has('Verb') && !terms[i + 1].tags.has('Copula') && terms[i + 2]?.tags.has('Pronoun'))) {
        return 'Person'
      }
    }
    return null
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
