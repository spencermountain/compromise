const parse = function (matches, methods) {
  const parseMatch = methods.parseMatch
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match)
  })
  return matches
}
module.exports = parse
