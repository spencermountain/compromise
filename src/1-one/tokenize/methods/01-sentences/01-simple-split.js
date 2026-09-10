// split by periods, question marks, unicode ⁇, etc
// also ।॥ (devanagari), ؟ (arabic), ۔ (urdu), ։ (armenian), ።፧ (ethiopic), ။ (burmese), ។ (khmer)
const initSplit = /([.!?\u203D\u2E18\u203C\u2047-\u2049\u0964\u0965\u061F\u06D4\u0589\u1362\u1367\u104B\u17D4\u3002]+\s)/g
// merge these back into prev sentence
const splitsOnly = /^[.!?\u203D\u2E18\u203C\u2047-\u2049\u0964\u0965\u061F\u06D4\u0589\u1362\u1367\u104B\u17D4\u3002]+\s$/
const newLine = /((?:\r?\n|\r)+)/ // Match different new-line formats

// CJK full-stops 。！？｡ are never used in numbers or abbreviations,
// so they can end a sentence without any whitespace after them.
// A full-stop followed by a closing bracket 」』）” only ends the sentence when the
// bracket is followed by whitespace, another opening bracket, or the end of the text
//  - '「行きません。」と言った' stays together,  '「はい。」「いいえ。」' splits
const hasCjkStop = /[\u3002\uFF01\uFF1F\uFF61]/
const cjkStops = '\\u3002\\uFF01\\uFF1F\\uFF61' // 。！？｡
const allStops = '.!?\\u203D\\u2E18\\u203C\\u2047-\\u2049' + '\u0964\u0965\u061F\u06D4\u0589\u1362\u1367\u104B\u17D4' + cjkStops
const openers = '\\u300C\\u300E\\uFF08\\u3010\\u3014\\u300A\\u3008\\u201C' // 「『（【〔《〈“
const closers = '\\u300D\\u300F\\uFF09\\u3011\\u3015\\u300B\\u3009\\u201D' // 」』）】〕》〉”
const initSplitCjk = new RegExp(
  `([${allStops}]+\\s|[${cjkStops}]+(?![${closers}${cjkStops}])|[${cjkStops}]+[${closers}]+(?=[\\s${openers}]|$))`,
  'g'
)
const splitsOnlyCjk = new RegExp(`^(?:[${allStops}]+\\s|[${cjkStops}]+[${closers}]*)$`)

// Start with a regex:
const basicSplit = function (text) {
  const all = []
  // japanese/chinese text has no whitespace after its full-stops
  const isCjk = hasCjkStop.test(text)
  const splitReg = isCjk ? initSplitCjk : initSplit
  const onlyReg = isCjk ? splitsOnlyCjk : splitsOnly
  //first, split by newline
  const lines = text.split(newLine)
  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    const arr = lines[i].split(splitReg)
    for (let o = 0; o < arr.length; o++) {
      // merge 'foo' + '.'
      if (arr[o + 1] && onlyReg.test(arr[o + 1]) === true) {
        arr[o] += arr[o + 1]
        arr[o + 1] = ''
      }
      if (arr[o] !== '') {
        all.push(arr[o])
      }
    }
  }
  return all
}
export default basicSplit
