// merge embedded quotes into 1 sentence
// like - 'he said "no!" and left.'
const MAX_QUOTE = 280 // ¯\_(ツ)_/¯
const MAX_AHEAD = 5

// each opening quote, and the marks that may close it
// (some marks open a quote in one language, and close it in another)
// a third mark means 'not an opener, when that one is around'
// don't support single-quotes for multi-sentences
const pairs = [
  ['\u0022', '\u0022'], // straight
  ['\uFF02', '\uFF02'], // wide
  ['\u201C', '\u201D', '\u201E'], // english (but it closes a german one)
  ['\u201F', '\u201D'], // reversed
  ['\u201E', '\u201D\u201C'], // polish, german
  ['\u2E42', '\u201D'], // low-reversed
  ['\u201A', '\u2019\u2018'], // low-single, german
  ['\u00AB', '\u00BB'], // french
  ['\u00BB', '\u00AB'], // german
  ['\u2039', '\u203A'], // single
  ['\u203A', '\u2039'], // single, reversed
  ['\u2035', '\u2032'], // prime
  ['\u2036', '\u2033'], // double-prime
  ['\u2037', '\u2034'], // triple-prime
  ['\u301D', '\u301E'], // prime
  ['\u301F', '\u301E'], // low-prime
  ['\u300C', '\u300D'], // corner
  ['\u300E', '\u300F'], // white-corner
]

// any opening mark - most sentences have none
const hasQuote = new RegExp('[' + pairs.map(a => a[0]).join('') + ']')

const count = function (str, chars) {
  let n = 0
  for (const c of str) {
    if (chars.includes(c)) {
      n += 1
    }
  }
  return n
}

// is there a quotation here, that hasn't closed yet?
const isOpen = function (str) {
  if (!hasQuote.test(str)) {
    return false
  }
  return pairs.some(([open, close, unless]) => {
    const n = count(str, open)
    if (n === 0 || (unless && str.includes(unless))) {
      return false
    }
    // the same mark opens and closes
    if (open === close) {
      return n % 2 === 1
    }
    return n > count(str, close)
  })
}

// allow micro-sentences when inside a quotation, like:
// the doc said "no sir. i will not beg" and walked away.
const quoteMerge = function (splits) {
  const arr = []
  for (let i = 0; i < splits.length; i += 1) {
    let str = splits[i]
    if (isOpen(str)) {
      // look ahead for the sentence that closes it
      let toAdd = ''
      for (let n = i + 1; n < splits.length && n - i <= MAX_AHEAD; n += 1) {
        toAdd += splits[n]
        //make sure it's not too-long
        if (toAdd.length >= MAX_QUOTE) {
          break
        }
        if (!isOpen(str + toAdd)) {
          // merge them all
          str += toAdd
          i = n
          break
        }
      }
    }
    arr.push(str)
  }
  return arr
}
export default quoteMerge
