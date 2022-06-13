// extract the clear needs for an individual match token
const getTokenNeeds = function (reg) {
  // negatives can't be cached
  if (reg.optional === true || reg.negative === true) {
    return null
  }
  if (reg.tag) {
    return '#' + reg.tag
  }
  if (reg.word) {
    return reg.word
  }
  if (reg.switch) {
    return `%${reg.switch}%`
  }
  return null
}

const getNeeds = function (regs) {
  let needs = []
  regs.forEach(reg => {
    needs.push(getTokenNeeds(reg))
    // support AND (foo && tag)
    if (reg.operator === 'and' && reg.choices) {
      reg.choices.forEach(oneSide => {
        oneSide.forEach(r => {
          needs.push(getTokenNeeds(r))
        })
      })
    }
  })
  return needs.filter(str => str)
}

const getWants = function (regs) {
  let wants = []
  regs.forEach(reg => {
    if (reg.operator === 'or') {
      // add fast-or terms
      if (reg.fastOr) {
        Array.from(reg.fastOr).forEach(w => {
          wants.push(w)
        })
      }
      // add slow-or
      if (reg.choices) {
        reg.choices.forEach(rs => {
          rs.forEach(r => {
            let n = getTokenNeeds(r)
            if (n) {
              wants.push(n)
            }
          })
        })
      }
    }
  })
  return wants
}

const parse = function (matches, world) {
  const parseMatch = world.methods.one.parseMatch
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match, {}, world)
    // wrap these ifNo properties into an array
    if (typeof obj.ifNo === 'string') {
      obj.ifNo = [obj.ifNo]
    }
    // cache any requirements up-front 
    obj.needs = getNeeds(obj.regs)
    obj.wants = getWants(obj.regs)
    // get rid of tiny sentences
    obj.minWords = obj.regs.filter(o => !o.optional).length
  })
  return matches
}

export default parse
