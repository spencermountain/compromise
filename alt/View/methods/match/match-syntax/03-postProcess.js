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

// optimize an 'or' lookup, when the (a|b|c) list is simple or multi-word
const doFastOrMode = function (tokens) {
  return tokens.map(token => {
    if (token.choices !== undefined) {
      // are they all straight-up words? then optimize them.
      let shouldPack = token.choices.every(block => {
        if (block.length !== 1) {
          return false
        }
        let reg = block[0]
        if (reg.word !== undefined && reg.negative !== true && reg.optional !== true && reg.method !== true) {
          return true //reg is simple-enough
        }
        return false
      })
      if (shouldPack === true) {
        let oneOf = {}
        token.choices.forEach(block => {
          oneOf[block[0].word] = true
        })
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
  return tokens
}
module.exports = postProcess
