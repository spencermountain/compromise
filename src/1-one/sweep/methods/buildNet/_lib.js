// Only cache required, single-term boundary checks.
const getBoundary = (reg, boundary) => {
  if (!reg || !reg[boundary] || reg.optional || reg.negative || reg.greedy ||
    reg.choices || reg.anything || reg.regex || reg.method) {
    return null
  }
  return reg
}

export default getBoundary
