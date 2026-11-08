// Split out /regex/ tokens - 'foo /yes/' and not 'foo/no/bar' - in linear time.
// Has the grammar of this pattern, which rescans the line for each rejected opener:
// (?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?=\s|$)
const prefix = new Set('![^')
const suffix = new Set('?]+*$~')
const newline = new Set('\n\r  ') // what '.' can't cross
const whitespace = /\s/

const splitRegs = str => {
  if (!str.includes('/')) {
    return [str]
  }
  const length = str.length
  const afterSuffix = new Uint32Array(length + 1)
  const ends = new Uint32Array(length) // a token's end, by its opening '/' or '<'
  afterSuffix[length] = length
  let close = 0 // the nearest valid closing, for a body starting at i+1
  let capture = 0 // the rightmost valid '>' wins, and it can't cross another '<'
  for (let i = length - 1; i >= 0; i--) {
    if (str[i] === '/') {
      ends[i] = close
    }
    afterSuffix[i] = suffix.has(str[i]) ? afterSuffix[i + 1] : i
    if (newline.has(str[i])) {
      close = 0
    }
    if (str[i + 1] === '/' && str[i] !== '/' && str[i] !== '\\') {
      const end = afterSuffix[i + 2]
      if (end === length || whitespace.test(str[end])) {
        close = end
      }
    }
    if (str[i] === '<') {
      ends[i] = capture
      capture = 0
    } else if (str[i] === '>' && !capture && str[i + 1] === '/') {
      capture = ends[i + 1]
    }
  }
  const parts = []
  let previous = 0
  // -1 stands in for the '^' start
  for (let i = -1; i < length; i++) {
    if (i === -1 || whitespace.test(str[i])) {
      let start = i + 1
      while (prefix.has(str[start])) {
        start++
      }
      const end = ends[start]
      if (end) {
        parts.push(str.slice(previous, Math.max(i, 0)), str.slice(i + 1, end))
        // the whitespace after this token can also open the next one
        previous = end + 1
        i = end - 1
      }
    }
  }
  parts.push(str.slice(previous))
  return parts
}
export default splitRegs
