
const isCapital = (terms, i) => {
  if (terms[i].tags.has('ProperNoun')) {// 'Comfort Inn'
    return 'Noun'
  }
  return null
}
const isAloneVerb = (terms, i) => {
  if (i === 0 && !terms[1]) {// 'Help'
    return 'Verb'
  }
  return null
}

const adhoc = {
  'Adj|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Noun': (terms, i) => {
    return isCapital(terms, i)
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
    return isCapital(terms, i) || isAloneVerb(terms, i)
  },
  'Plural|Verb': (terms, i) => {
    return isCapital(terms, i) || isAloneVerb(terms, i)
  },
  'Person|Noun': (terms, i) => {
    return isCapital(terms, i)
  },
  'Person|Verb': (terms, i) => {
    return i !== 0 && isCapital(terms, i)
  },
}
export default adhoc