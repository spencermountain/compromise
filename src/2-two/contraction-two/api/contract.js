const postPunct = /[,)"';:\-–—.…]/

const contractTerms = function (terms, suffix) {
  //avoid any problematic punctuation
  for (let i = 0; i < terms.length - 1; i++) {
    const t = terms[i]
    if (postPunct.test(t.post)) {
      return
    }
  }
  // set first word as full text
  terms[0].implicit = terms[0].normal
  terms[0].text += suffix
  terms[0].normal += suffix
  // clean-up the others
  terms.slice(1).forEach(t => {
    t.implicit = t.normal
    t.text = ''
    t.normal = ''
  })
  for (let i = 0; i < terms.length - 1; i++) {
    terms[i].post = terms[i].post.replace(/ /, '')
  }
}

// contract each match on its own
const setContraction = function (m, suffix) {
  m.docs.forEach(terms => contractTerms(terms, suffix))
}

// [match, suffix] - in order, as earlier contractions hide words from later ones
const contractions = [
  // we are -> we're
  ['(we|they|you) are', `'re`],
  // they will -> they'll
  ['(he|she|they|it|we|you) will', `'ll`],
  // she is -> she's
  ['(he|she|they|it|we) is', `'s`],
  // spencer is -> spencer's
  ['#Pers is', `'s`],
  // spencer would -> spencer'd
  ['#Pers would', `'d`],
  // would not -> wouldn't (skip words already contracted above, like he's)
  ['(is|was|were|had|would|should|could|do|does|did|have|has) not', `n't`, true],
  // can not -> can't
  ['can not', `'t`],
  // i have -> i've
  ['(i|we|they) have', `'ve`],
  // would have -> would've
  ['(would|should|could) have', `'ve`],
  // i am -> i'm
  ['i am', `'m`],
]

/** turn 'i am' into i'm */
const contract = function () {
  const doc = this.not('@hasContraction')
  contractions.forEach(([match, suffix, skipDone]) => {
    let m = doc.match(match)
    if (skipDone) {
      m = m.ifNo('@hasContraction')
    }
    setContraction(m, suffix)
  })
  return this
}
export default contract
