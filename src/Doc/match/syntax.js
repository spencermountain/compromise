const parseToken = require('./parseToken')

const isArray = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//split-up by (these things)
const byParentheses = function(str) {
  let arr = str.split(/(\[?\(.*?\)[?+*]*\]?)/)
  arr = arr.map(s => s.trim())
  return arr
}

const byWords = function(arr) {
  let words = []
  arr.forEach(a => {
    //keep brackets lumped together
    if (/^[[^_/]?\(/.test(a[0])) {
      words.push(a)
      return
    }
    let list = a.split(' ')
    list = list.filter(w => w)
    words = words.concat(list)
  })
  return words
}

//turn an array into a 'choices' list
const byArray = function(arr) {
  return [
    {
      choices: arr.map(s => {
        return {
          normal: s,
        }
      }),
    },
  ]
}

/** parse a match-syntax string into json */
const syntax = function(str) {
  // fail-fast
  if (str === null || str === undefined || str === '') {
    return []
  }
  //try to support a ton of different formats:
  if (typeof str === 'object') {
    if (isArray(str)) {
      if (str.length === 0 || !str[0]) {
        return []
      }
      //is it a pre-parsed reg-list?
      if (typeof str[0] === 'object') {
        return str
      }
      //support a flat array of normalized words
      if (typeof str[0] === 'string') {
        return byArray(str)
      }
    }
    return []
  }
  if (typeof str === 'number') {
    str = String(str) //go for it?
  }
  let tokens = byParentheses(str)
  tokens = byWords(tokens)
  tokens = tokens.map(parseToken)
  return tokens
}
module.exports = syntax
