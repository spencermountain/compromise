
const isCapital = (terms, i) => {
  if (terms[i].tags.has('ProperNoun')) {// 'Comfort Inn'
    return 'Noun'
  }
  return null
}
const isAloneVerb = (terms, i, tag) => {
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

const adhoc = {
  'Adj|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Noun': (terms, i) => {
    return isCapital(terms, i) || isEndNoun(terms, i)
  },
  'Adj|Past': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Present': (terms, i) => {
    return isCapital(terms, i)
  },
  'Noun|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Noun|Verb': (terms, i) => {
    return isCapital(terms, i) || isAloneVerb(terms, i, 'Infinitive')
  },
  'Plural|Verb': (terms, i) => {
    return isCapital(terms, i) || isAloneVerb(terms, i, 'PresentTense')
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
}
export default adhoc