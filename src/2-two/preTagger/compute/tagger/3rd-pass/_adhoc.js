
const isCapital = (terms, i) => {
  if (terms[i].tags.has('ProperNoun')) {// 'Comfort Inn'
    return 'Noun'
  }
}
const isAloneVerb = (terms, i) => {
  if (i === 0 && !terms[1]) {// 'Help'
    return 'Verb'
  }
}

// "food and programs" vs "writes and programs"
const isList = function (terms, i, vb) {
  // "x and ___"
  if (terms[i - 1] && terms[i - 2] && !terms[i - 2].switch) {
    let str = terms[i - 1].normal
    if (str === 'and' || str === 'or') {
      // 'Noun and ___'
      if (terms[i - 2].tags.has('Noun')) {
        return 'Noun'
      }
      // 'writes and ___'
      if (terms[i - 2].tags.has(vb)) {
        return vb
      }
    }
  }
  // "___ and programs"
  if (terms[i + 1] && terms[i + 2] && !terms[i + 2].switch) {
    let str = terms[i + 1].normal
    if (str === 'and' || str === 'or') {
      // 'Noun and ___'
      if (terms[i + 2].tags.has('Noun')) {
        return 'Noun'
      }
      // 'writes and ___'
      if (terms[i + 2].tags.has(vb)) {
        return vb
      }
    }
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
    return isList(terms, i, 'Infinitive') || isCapital(terms, i) || isAloneVerb(terms, i)
  },
  'Plural|Verb': (terms, i) => {
    return isList(terms, i, 'PresentTense') || isCapital(terms, i) || isAloneVerb(terms, i)
  },
  'Person|Noun': (terms, i) => {
    return isCapital(terms, i)
  },
  // 'Person|Verb': (terms, i) => {
  // return isCapital(terms, i)
  // },
}
export default adhoc