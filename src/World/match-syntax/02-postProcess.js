// name any [unnamed] capture-groups with a number
const nameGroups = function (tokens) {
  let convert = false
  let index = -1
  let current
  //'fill in' capture groups between start-end
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    // Give name to un-named single tokens
    if (token.groupType === 'single' && token.named === true) {
      index += 1
      token.named = index
      continue
    }
    // Start converting tokens
    if (token.groupType === 'start') {
      convert = true
      if (typeof token.named === 'string' || typeof token.named === 'number') {
        current = token.named
      } else {
        index += 1
        current = index
      }
    }
    // Ensure this token has the right name
    if (convert) {
      token.named = current
    }
    // Stop converting tokens
    if (token.groupType === 'end') {
      convert = false
    }
  }
  return tokens
}

// this this match simple-enough for a fast-or match?
const simpleWord = function (reg) {
  if (reg.optional === true) {
    return false
  }
  if (reg.negative === true) {
    return false
  }
  if (reg.word !== undefined) {
    return true
  }
  return false
}

// this is a faster 'or' lookup, when the (a|b|c) list is simple
const doFastOrMode = function (tokens) {
  return tokens.map(token => {
    if (token.choices !== undefined) {
      // are they all straight non-optional words?
      let shouldPack = token.choices.every(simpleWord)
      if (shouldPack === true) {
        let oneOf = {}
        token.choices.forEach(c => (oneOf[c.word] = true))
        token.fastOr = oneOf
        delete token.choices
      }
    }
    return token
  })
}

const postProcess = function (tokens, opts = {}) {
  // ensure all capture groups are filled between start and end
  // give all capture groups names
  let count = tokens.filter(t => t.groupType).length
  if (count > 0) {
    tokens = nameGroups(tokens)
  }
  // convert 'choices' format to 'fastOr' format
  if (!opts.fuzzy) {
    tokens = doFastOrMode(tokens)
  }
  // console.log(tokens)

  return tokens
}
module.exports = postProcess
