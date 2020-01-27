const parseToken = require('./parseToken')
// const cache = {}

const isNamed = function(capture) {
  return typeof capture === 'string' || typeof capture === 'number'
}

const isArray = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//split-up by (these things)
const byParentheses = function(str) {
  let arr = str.split(/([\^\[\!]*\(.*?\)[?+*]*\]?\$?)/)
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

const getLastTrue = (arr, start) => {
  const last = arr.length - 1 - arr.reverse().findIndex(t => t === true)

  for (let j = start + 1; j < last; j++) {
    // Don't fill in if there's a named group ahead
    if (isNamed(arr[j])) {
      return start
    }
  }

  return last
}

const postProcess = function(tokens) {
  // ensure there's only one consecutive capture group.
  let count = tokens.filter(t => t.named === true || isNamed(t.named)).length
  if (count > 1) {
    let captureArr = tokens.map(t => t.named)
    let first = captureArr.findIndex(t => t === true || isNamed(t))
    let last = getLastTrue(captureArr, first)

    //'fill in' capture groups between start-end
    for (let i = first; i < last + 1; i++) {
      // Don't replace named groups
      if (isNamed(tokens[i].named)) {
        continue
      }
      const { named } = tokens[first]
      tokens[i].named = named
    }

    // Remove empty named reg - probably an OR capture group
    if (Object.keys(tokens[first]).length === 1) {
      tokens.splice(first, 1)
    }
  }

  return tokens
}

const fromDoc = function(doc) {
  if (!doc || !doc.list || !doc.list[0]) {
    return []
  }
  let ids = []
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      ids.push({ id: t.id })
    })
  })
  return [{ choices: ids, greedy: true }]
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
  // console.log(JSON.stringify(tokens, null, 2))
  return tokens
}

// const memoizeSyntax = function(input) {
//   if (typeof input === 'string' && cache.hasOwnProperty(input)) {
//     return cache[input]
//   }
//   let res = syntax(input)
//   cache[input] = res
//   return res
// }
module.exports = syntax
