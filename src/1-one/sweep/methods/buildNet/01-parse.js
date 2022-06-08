const parse = function (matches, world) {
  const parseMatch = world.methods.one.parseMatch
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match, {}, world)
    // wrap these ifNo properties into an array
    if (typeof obj.ifNo === 'string') {
      obj.ifNo = [obj.ifNo]
    }
  })
  return matches
}

export default parse
