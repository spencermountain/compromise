const parse = function (matches, methods) {
  const parseMatch = methods.one.parseMatch
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match)
  })
  return matches
}

export default parse
