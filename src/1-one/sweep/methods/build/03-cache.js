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
  return null
}

// extract the clear needs for each match
const findNeeds = function (regs) {
  // parse match strings
  let need = new Set()
  regs.forEach(reg => {
    let res = getTokenNeeds(reg)
    if (res) {
      need.add(res)
    } else {
      // support AND (foo && tag)
      if (reg.operator === 'and' && reg.choices) {
        reg.choices.forEach(oneSide => {
          oneSide.forEach(r => {
            let n = getTokenNeeds(r)
            if (n) {
              need.add(n)
            }
          })
        })
      }
    }
  })
  return need
}

// produce quick lookups for a list of matches
const cache = function (matches) {
  matches.forEach(obj => {
    obj.needs = Array.from(findNeeds(obj.regs))
  })
  return matches
}

export default cache
