//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation

//we have slightly different rules for start/end - like #hashtags.
const isLetter = /\p{Letter}/u
const isNumber = /[\p{Number}\p{Currency_Symbol}]/u
const hasAcronym = /^[a-z]\.([a-z]\.)+/i
const chillin = /[sn]['’]$/
const isFullNumber = /^[(+\-]?\d+(th|st|nd|rd)?[)+\-]?$/
const openers = { ')': '(', ']': '[', '}': '{' }

// does this closing bracket close one inside the word, like 'foo(bar)'
const closesInside = function (chars, start, end) {
  const close = chars[end - 1]
  let depth = 0
  for (let i = start; i < end - 1; i += 1) {
    if (chars[i] === openers[close]) {
      depth += 1
    } else if (chars[i] === close) {
      depth -= 1
    }
  }
  return depth > 0
}

const normalizePunctuation = function (str, model) {
  // quick lookup for allowed pre/post punctuation
  const { prePunctuation, postPunctuation, emoticons } = model.one
  const original = str
  let pre = ''
  let post = ''
  const chars = Array.from(str)
  let start = 0
  let end = chars.length

  // punctuation-only words, like '<3'
  if (Object.hasOwn(emoticons, str.trim())) {
    return { str: str.trim(), pre, post: ' ' } //not great
  }

  // Locate the first retained code point without shifting the array.
  while (start < end) {
    const c = chars[start]
    // keep any declared chars
    if (prePunctuation[c] === true) {
      break//keep it
    }
    // keep '+' or '-' only before a number
    if ((c === '+' || c === '-' || c === '(') && isFullNumber.test(str.trim())) {
      break//done
    }
    // '97 - year short-form
    if (c === "'" && c.length === 3 && isNumber.test(chars[start + 1])) {
      break//done
    }
    // start of word
    if (isLetter.test(c) || isNumber.test(c)) {
      break //done
    }
    // punctuation
    start++
  }

  // Locate the last retained code point.
  while (end > start) {
    const c = chars[end - 1]
    // keep any declared chars
    if (postPunctuation[c] === true) {
      break//keep it
    }
    // start of word
    if (isLetter.test(c) || isNumber.test(c)) {
      break //done
    }
    // F.B.I.
    if (c === '.' && hasAcronym.test(original) === true) {
      break//keep it
    }
    //  keep s-apostrophe - "flanders'" or "chillin'"
    if (c === "'" && chillin.test(original) === true) {
      break//keep it
    }
    // keep '+' or ')' only for a number like (800) or 500+
    if ((c === '+' || c === ')') && isFullNumber.test(str.trim())) {
      break//done
    }
    if (Object.hasOwn(openers, c) && closesInside(chars, start, end)) {
      break//keep it
    }
    // punctuation
    end--
  }
  pre = chars.slice(0, start).join('')
  post = chars.slice(end).join('')
  str = chars.slice(start, end).join('')
  //we went too far..
  if (str === '') {
    // do a very mild parse, and hope for the best.
    let last = original.length
    while (last > 0 && original[last - 1] === ' ') last--
    post = original.slice(last)
    str = original.slice(0, last)
    pre = ''
  }
  return { str, pre, post }
}
export default normalizePunctuation
