// Split parenthesized match blocks without retrying long rejected prefixes or
// bodies. Preserve the original grammar, including its greedy capture header.
const prefix = new Set('!~[^')
const suffix = new Set('?]+*$~')
const whitespace = /\s/

const splitGroups = str => {
  if (!str.includes('(') || !str.includes(')')) return [str]
  const length = str.length
  const afterSuffix = new Uint32Array(length + 1)
  const bodyEnd = new Uint32Array(length)
  const captureEnd = new Uint32Array(length)
  afterSuffix[length] = length
  let close = -1
  let capture = 0
  for (let i = length - 1; i >= 0; i--) {
    afterSuffix[i] = suffix.has(str[i]) ? afterSuffix[i + 1] : i
    if (str[i] === ')') close = i
    if (str[i] === '(' && close >= i + 3 && str[close - 1] !== '\\') {
      const end = afterSuffix[close + 1]
      if (end === length || whitespace.test(str[end])) bodyEnd[i] = end
    }
    // The optional <...> header cannot cross another '<', and prefers the
    // rightmost '>' which is followed by a valid parenthesized block.
    if (str[i] === '<') {
      captureEnd[i] = capture
      capture = 0
    } else if (str[i] === '>' && !capture && bodyEnd[i + 1]) {
      capture = bodyEnd[i + 1]
    }
  }
  const parts = []
  let previous = 0
  let i = 0
  while (i < length) {
    const start = i
    while (i < length && prefix.has(str[i])) i++
    const end = str[i] === '<' ? captureEnd[i] : bodyEnd[i]
    if (end) {
      parts.push(str.slice(previous, start), str.slice(start, end))
      // The old delimiter consumes one following whitespace character.
      i = end < length ? end + 1 : end
      previous = i
    } else if (i === start) {
      i++
    }
  }
  parts.push(str.slice(previous))
  return parts
}
export default splitGroups
