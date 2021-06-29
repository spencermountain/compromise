const growFastOr = function (obj, index) {
  let or = obj.regs[index]
  return Array.from(or.fastOr).map(str => {
    return { word: str }
  })
}

const compileMatches = function (matches, methods) {
  const parseMatch = methods.parseMatch
  // const cacheMatch = methods.cacheMatch
  let final = []
  // add metadata to match objects
  matches.forEach((obj, i) => {
    obj.regs = parseMatch(obj.match)
    // obj.needs = Array.from(cacheMatch(obj.regs))
    let foundOr = obj.regs.findIndex(reg => reg.fastOr)
    if (foundOr !== -1) {
      // let expanded = growFastOr(obj, foundOr)
      // expanded.forEach( toAdd => {
      // })
      // console.log(obj.regs)
      // matches[i]=null
    }
  })
  console.log(matches)
}
module.exports = compileMatches
