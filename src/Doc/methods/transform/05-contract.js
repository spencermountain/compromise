const postPunct = /[,\)"';:\-–—\.…]/
const irregulars = {
  'will not': `won't`,
  'i am': `i'm`,
}

const setContraction = function(m, suffix) {
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
    t.post = t.post.replace(/ /, '')
  })
}

exports.contract = function() {
  // we are -> we're
  let m = this.match('(we|they|you) are')
  setContraction(m, `'re`)
  // they will -> they'll
  m = this.match('(he|she|they|it|we|you) will')
  setContraction(m, `'ll`)
  // she is -> she's
  m = this.match('(he|she|they|it|we) is')
  setContraction(m, `'s`)
  // spencer is -> spencer's
  m = this.match('#Person is')
  setContraction(m, `'s`)
  // spencer would -> spencer'd
  m = this.match('#Person would')
  setContraction(m, `'d`)
  // would not -> wouldn't
  m = this.match('(is|was|had|would|should|could|do|does|have|has|can) not')
  setContraction(m, `n't`)
  // would have -> would've
  m = this.match('(would|should|could) have')
  setContraction(m, `'ve`)
  // i am -> i'm
  m = this.match('i am')
  setContraction(m, `'m`)
  // going to -> gonna
  m = this.match('going to')
  return this
}
