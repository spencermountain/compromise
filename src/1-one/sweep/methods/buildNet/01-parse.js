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

// Only allow hooks that every successful match must contain. In particular,
// a word inside an optional or negative AND block is not a required hook.
const hasRequiredHook = function (regs, hook) {
  return regs.some(reg => {
    if (reg.optional || reg.negative) {
      return false
    }
    if (getTokenNeeds(reg) === hook) {
      return true
    }
    return reg.operator === 'and' && reg.choices &&
      reg.choices.some(side => hasRequiredHook(side, hook))
  })
}

const getNeeds = function (regs) {
  const needs = []
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
  const wants = []
  let count = 0
  regs.forEach(reg => {
    if (reg.operator === 'or' && !reg.optional && !reg.negative) {
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
            const n = getTokenNeeds(r)
            if (n) {
              wants.push(n)
            }
          })
        })
      }
      count += 1
    }
  })
  return { wants, count }
}

const parse = function (matches, world) {
  const parseMatch = world.methods.one.parseMatch
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match, {}, world)
    // wrap these ifNo properties into an array
    if (typeof obj.ifNo === 'string') {
      obj.ifNo = [obj.ifNo]
    }
    if (obj.notIf) {
      obj.notIf = parseMatch(obj.notIf, {}, world)
    }
    // cache any requirements up-front 
    obj.needs = getNeeds(obj.regs)
    if (obj.hook !== undefined) {
      if (typeof obj.hook !== 'string' || !obj.needs.includes(obj.hook) || !hasRequiredHook(obj.regs, obj.hook)) {
        throw new Error(`Invalid hook "${obj.hook}" for match "${obj.match}": use a required word, #Tag, or %Switch%.`)
      }
    }
    const { wants, count } = getWants(obj.regs)
    obj.wants = wants
    obj.minWant = count
    // get rid of tiny sentences
    obj.minWords = obj.regs.filter(o => !o.optional).length
    // The matcher excludes negative tokens from its own minimum. Cache that
    // separately rather than changing the sweep's existing length filter.
    obj.minLength = obj.regs.filter(o => o.optional !== true && o.negative !== true).length
  })
  return matches
}

export default parse
