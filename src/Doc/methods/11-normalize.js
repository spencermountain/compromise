/*{
    case: true,
    whitespace: true,
    unicode: true,
    punctuation: true,

    contractions: true,

    adverbs: true,
    emoji: true,
    parentheses: true,
    quotations: true,

    verbs: true,
    nouns: true,
 }*/

exports.normalize = function(options = {}) {
  let termArr = this.list.map(ts => ts.terms())
  if (options.whitespace) {
    termArr.forEach(terms => {
      terms.forEach(t => {
        t.postText = t.postText.trim()
        t.preText = t.preText.trim() + ' '
      })
      // terms[0].preText = terms[0].preText.trim()
    })
  }
  return this
}
