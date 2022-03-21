import methods from './methods.js'

// turn presets into key-vals
const split = (str) => {
  return str.split('|').reduce((h, k) => {
    h[k] = true
    return h
  }, {})
}

const light = 'case|unicode|whitespace|punctuation|acronyms|honorifics'
const medium = '|contractions|parentheses|quotations|emoji'
const heavy = '|possessives|adverbs|nouns|verbs'
const presets = {
  light: split(light),
  medium: split(light + medium),
  heavy: split(light + medium + heavy)
}

const api = function (View) {

  View.prototype.normalize = function (opts = 'light') {
    if (typeof opts === 'string') {
      opts = presets[opts]
    }
    // 
    Object.keys(opts).forEach(fn => {
      methods[fn](this, opts[fn])
    })
  }
}
export default api