const wordlike = /\S/
const isBoundary = /^[!?.]+$/
const naiiveSplit = /(\S+)/
const isSlash = /[a-z] ?\/ ?[a-z]*$/

let notWord = ['.', '?', '!', ':', ';', '-', '–', '—', '--', '...', '(', ')', '[', ']', '"', "'", '`']
notWord = notWord.reduce((h, c) => {
  h[c] = true
  return h
}, {})

const hasHyphen = function (str) {
  //dont split 're-do'
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    return false
  }
  //letter-number 'aug-20'
  let reg = /^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i
  if (reg.test(str) === true) {
    return true
  }
  //number-letter '20-aug'
  let reg2 = /^([0-9]{1,4})(-|–|—)([a-z\u00C0-\u00FF`"'/]+$)/i
  if (reg2.test(str) === true) {
    return true
  }
  //support weird number-emdash combo '2010–2011'
  // let reg2 = /^([0-9]+)(–|—)([0-9].*)/i
  // if (reg2.test(str)) {
  //   return true
  // }
  return false
}

// 'he / she' should be one word
const combineSlashes = function (arr) {
  for (let i = 1; i < arr.length - 1; i++) {
    if (isSlash.test(arr[i])) {
      arr[i - 1] += arr[i] + arr[i + 1]
      arr[i] = null
      arr[i + 1] = null
    }
  }
  return arr
}

const splitHyphens = function (word) {
  let arr = []
  //support multiple-hyphenated-terms
  const hyphens = word.split(/[-–—]/)
  let whichDash = '-'
  let found = word.match(/[-–—]/)
  if (found && found[0]) {
    whichDash = found
  }
  for (let o = 0; o < hyphens.length; o++) {
    if (o === hyphens.length - 1) {
      arr.push(hyphens[o])
    } else {
      arr.push(hyphens[o] + whichDash)
    }
  }
  return arr
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//turn a string into an array of strings (naiive for now, lumped later)
const splitWords = function (str) {
  let result = []
  let arr = []
  //start with a naiive split
  str = str || ''
  if (typeof str === 'number') {
    str = String(str)
  }
  if (isArray(str)) {
    return str
  }

  const words = str.split(naiiveSplit)
  for (let i = 0; i < words.length; i++) {
    //split 'one-two'
    if (hasHyphen(words[i]) === true) {
      arr = arr.concat(splitHyphens(words[i]))
      continue
    }
    arr.push(words[i])
  }
  //greedy merge whitespace+arr to the right
  let carry = ''
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i]
    //if it's more than a whitespace
    if (wordlike.test(word) === true && notWord.hasOwnProperty(word) === false && isBoundary.test(word) === false) {
      //put whitespace on end of previous term, if possible
      if (result.length > 0) {
        result[result.length - 1] += carry
        result.push(word)
      } else {
        //otherwise, but whitespace before
        result.push(carry + word)
      }
      carry = ''
    } else {
      carry += word
    }
  }
  //handle last one
  if (carry) {
    if (result.length === 0) {
      result[0] = ''
    }
    result[result.length - 1] += carry //put it on the end
  }
  // combine 'one / two'
  result = combineSlashes(result)
  // remove empty results
  result = result.filter(s => s)
  return result
}
module.exports = splitWords
