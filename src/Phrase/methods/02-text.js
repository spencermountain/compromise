const trimEnd = function (str) {
  return str.replace(/ +$/, '')
}

/** produce output in the given format */
exports.text = function (options = {}, isFirst, isLast) {
  if (typeof options === 'string') {
    if (options === 'normal') {
      options = {
        whitespace: true,
        unicode: true,
        lowercase: true,
        punctuation: true,
        acronyms: true,
        abbreviations: true,
        implicit: true,
        normal: true,
      }
    } else if (options === 'clean') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        normal: true,
      }
    } else if (options === 'reduced') {
      options = {
        punctuation: false, //Hmm: is this reversed?
        titlecase: false,
        lowercase: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        reduced: true,
      }
    } else if (options === 'root') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        root: true,
      }
    } else {
      options = {}
    }
  }
  let terms = this.terms()
  //this this phrase a complete sentence?
  let isFull = false
  if (terms[0] && terms[0].prev === null && terms[terms.length - 1].next === null) {
    isFull = true
  }
  let text = terms.reduce((str, t, i) => {
    options.last = isLast && i === terms.length - 1
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
    }
    let txt = t.textOut(options, showPre, showPost)
    // if (options.titlecase && i === 0) {
    // txt = titleCase(txt)
    // }
    return str + txt
  }, '')
  //full-phrases show punctuation, but not whitespace
  if (isFull === true && isLast) {
    text = trimEnd(text)
  }
  if (options.trim === true) {
    text = text.trim()
  }
  return text
}
