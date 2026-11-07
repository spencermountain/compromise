// set or append the pre/post of the first/last term of each match
const setSide = function (view, side, str, concat) {
  view.docs.forEach(terms => {
    const term = side === 'pre' ? terms[0] : terms.at(-1)
    if (concat === true) {
      term[side] += str
    } else {
      term[side] = str
    }
  })
  return view
}

// put these characters around each match
const wrap = function (view, start, end) {
  view.docs.forEach(terms => {
    terms[0].pre = start + terms[0].pre
    const last = terms.at(-1)
    last.post = end + last.post
  })
  return view
}

const methods = {
  /** add this punctuation or whitespace before each match: */
  pre: function (str, concat) {
    if (str === undefined && this.found) {
      return this.docs[0][0].pre
    }
    return setSide(this, 'pre', str, concat)
  },

  /** add this punctuation or whitespace after each match: */
  post: function (str, concat) {
    if (str === undefined) {
      const last = this.docs.at(-1)
      return last.at(-1).post
    }
    return setSide(this, 'post', str, concat)
  },

  /** remove whitespace from start/end */
  trim: function () {
    if (!this.found) {
      return this
    }
    const docs = this.docs
    const start = docs[0][0]
    start.pre = start.pre.trimStart()
    const last = docs.at(-1)
    const end = last.at(-1)
    end.post = end.post.trimEnd()
    return this
  },

  /** connect words with hyphen, and remove whitespace */
  hyphenate: function () {
    this.docs.forEach(terms => {
      //remove whitespace
      terms.forEach((t, i) => {
        if (i !== 0) {
          t.pre = ''
        }
        if (terms[i + 1]) {
          t.post = '-'
        }
      })
    })
    return this
  },

  /** remove hyphens between words, and set whitespace */
  dehyphenate: function () {
    const hasHyphen = /[-–—]/
    this.docs.forEach(terms => {
      //remove whitespace
      terms.forEach(t => {
        if (hasHyphen.test(t.post)) {
          t.post = ' '
        }
      })
    })
    return this
  },

  /** add quotations around these matches */
  toQuotations: function (start, end) {
    return wrap(this, start || '"', end || '"')
  },

  /** add brackets around these matches */
  toParentheses: function (start, end) {
    return wrap(this, start || '(', end || ')')
  },
}

// aliases
methods.deHyphenate = methods.dehyphenate
methods.toQuotation = methods.toQuotations

export default methods
