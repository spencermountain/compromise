// Track UTF-16 coordinates, including CRLF split across text fragments.
const positions = enabled => {
  const point = { line: 1, column: 1, offset: 0 }
  let carriage = false
  const advance = value => {
    for (let i = 0; i < value.length; i += 1) {
      const ch = value[i]
      point.offset += 1
      if (ch === '\r' || (ch === '\n' && !carriage)) {
        point.line += 1
        point.column = 1
      } else if (ch !== '\n') {
        point.column += 1
      }
      carriage = ch === '\r'
    }
  }
  const literal = (type, value) => {
    const start = { ...point }
    advance(value)
    const node = { type, value }
    if (enabled) {
      node.position = { start, end: { ...point } }
    }
    return node
  }
  const parent = (type, children) => {
    const node = { type, children }
    if (enabled) {
      node.position = {
        start: { ...(children[0]?.position.start || point) },
        end: { ...(children.at(-1)?.position.end || point) },
      }
    }
    return node
  }
  return { literal, parent }
}
export default positions
