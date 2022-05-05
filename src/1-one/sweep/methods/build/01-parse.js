const parse = function (matches, methods) {
  const parseMatch = methods.one.parseMatch
  matches.forEach((obj, i) => {
    obj.index = i + 1
    obj.regs = parseMatch(obj.match)
    // wrap these ifNo properties into an array
    if (typeof obj.ifNo === 'string') {
      obj.ifNo = [obj.ifNo]
    }
  })
  return matches
}

export default parse
