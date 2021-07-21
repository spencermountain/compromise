const getSyllables = require('./syllables')

const defaultObj = { normal: true, text: true, terms: false }

const addMethod = function(Doc) {
  /** split each term by typical pronounciation */
  Doc.prototype.syllables = function(obj) {
    let n = null
    if (typeof obj === 'number') {
      n = obj
      obj = {}
    }
    let data = this.json(obj || defaultObj)
    //add syllable data to each phrase
    data = data.map(o => {
      o.syllables = getSyllables(o.normal || o.text)
      return o
    })
    if (typeof n === 'number') {
      data = data[n]
    }
    return data
  }

  return Doc
}
module.exports = addMethod
