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
          word: s,
        }
      }),
    },
  ]
}

const postProcess = function(tokens) {
  //ensure there's only one consecutive capture group.
  let count = tokens.filter(t => t.capture === true).length
  if (count > 1) {
    let captureArr = tokens.map(t => t.capture)
    let first = captureArr.indexOf(true)
    let last = captureArr.length - 1 - captureArr.reverse().indexOf(true)
    //'fill in' capture groups between start-end
    for (let i = first; i < last; i++) {
      tokens[i].capture = true
    }
  }
  return tokens
}

const fromDoc = function(doc) {
  if (!doc || !doc.list || !doc.list[0]) {
    return []
  }
  return doc.list[0].terms().map(t => {
    return {
      id: t.id,
    }
  })
}

/** parse a match-syntax string into json */
const syntax = function(input) {
  // fail-fast
  if (input === null || input === undefined || input === '') {
    return []
  }
  //try to support a ton of different formats:
  if (typeof input === 'object') {
    if (isArray(input)) {
      if (input.length === 0 || !input[0]) {
        return []
      }

      //is it a pre-parsed reg-list?
      if (typeof input[0] === 'object') {
        return input
      }
      //support a flat array of normalized words
      if (typeof input[0] === 'string') {
        return byArray(input)
      }
    }
    //support passing-in a compromise object as a match
    if (input && input.isA === 'Doc') {
      return fromDoc(input)
    }
    return []
  }
  if (typeof input === 'number') {
    input = String(input) //go for it?
  }
  let tokens = byParentheses(input)
  tokens = byWords(tokens)
  tokens = tokens.map(parseToken)
  //clean up anything weird
  tokens = postProcess(tokens)
  return tokens
}
module.exports = syntax
