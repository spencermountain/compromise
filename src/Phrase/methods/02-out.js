const trimEnd = function(str) {
  return str.replace(/ +$/, '')
}

/** produce output in the given format */
exports.text = function(options = {}, isFirst, isLast) {
  let terms = this.terms()
  //this this phrase a complete sentence?
  let isFull = false
  if (terms[0].prev === null && terms[terms.length - 1].next === null) {
    isFull = true
  }
  let text = terms.reduce((str, t, i) => {
    options.last = i === terms.length - 1
    // let showPre = isFull === true && i !== 0
    // let showPost = isFull === true && i !== terms.length - 1
    let showPre = true
    let showPost = true
    if (isFull === false) {
      // dont show beginning whitespace
      if (i === 0 && isFirst) {
        showPre = false
      }
      // dont show end-whitespace
      if (i === terms.length - 1 && isLast) {
        showPost = false
      }
      // console.log(t.text, showPost)
    }
    return str + t.textOut(options, showPre, showPost)
  }, '')
  //full-phrases show punctuation, but not whitespace
  if (isFull === true && isLast) {
    text = trimEnd(text)
  }
  return text
}

/** return json metadata for this phrase */
exports.json = function(options = {}) {
  let res = {}
  // text data
  if (options.text) {
    res.text = this.text(options)
    if (options.trim) {
      res.text = res.text.trim()
    }
  }
  if (options.normal) {
    res.normal = this.text({
      punctuation: true,
      whitespace: true,
      unicode: true,
    })
  }
  // terms data
  if (options.terms) {
    res.terms = this.terms().map(t => t.json(options.terms))
  }
  return res
}
