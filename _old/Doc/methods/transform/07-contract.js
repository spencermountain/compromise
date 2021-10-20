const postPunct = /[,\)"';:\-–—\.…]/
// const irregulars = {
//   'will not': `won't`,
//   'i am': `i'm`,
// }

const setContraction = function (m, suffix) {
  if (!m.found) {
    return
  }
  let terms = m.termList()
  //avoid any problematic punctuation
  for (let i = 0; i < terms.length - 1; i++) {
    const t = terms[i]
    if (postPunct.test(t.post)) {
      return
    }
  }

  // set them as implict
  terms.forEach(t => {
    t.implicit = t.clean
  })
  // perform the contraction
  terms[0].text += suffix
  // clean-up the others
  terms.slice(1).forEach(t => {
    t.text = ''
  })
  for (let i = 0; i < terms.length - 1; i++) {
    const t = terms[i]
    t.post = t.post.replace(/ /, '')
  }
}

/** turn 'i am' into i'm */
exports.contract = function () {
  let doc = this.not('@hasContraction')
  // we are -> we're
  let m = doc.match('(we|they|you) are')
  setContraction(m, `'re`)
  // they will -> they'll
  m = doc.match('(he|she|they|it|we|you) will')
  setContraction(m, `'ll`)
  // she is -> she's
  m = doc.match('(he|she|they|it|we) is')
  setContraction(m, `'s`)
  // spencer is -> spencer's
  m = doc.match('#Person is')
  setContraction(m, `'s`)
  // spencer would -> spencer'd
  m = doc.match('#Person would')
  setContraction(m, `'d`)
  // would not -> wouldn't
  m = doc.match('(is|was|had|would|should|could|do|does|have|has|can) not')
  setContraction(m, `n't`)
  // i have -> i've
  m = doc.match('(i|we|they) have')
  setContraction(m, `'ve`)
  // would have -> would've
  m = doc.match('(would|should|could) have')
  setContraction(m, `'ve`)
  // i am -> i'm
  m = doc.match('i am')
  setContraction(m, `'m`)
  // going to -> gonna
  m = doc.match('going to')
  return this
}
