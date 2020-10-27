const isNamed = function (capture) {
  return typeof capture === 'string' || typeof capture === 'number'
}

const fillGroups = function (tokens) {
  let convert = false
  let index = -1
  let current

  //'fill in' capture groups between start-end
  for (let i = 0; i < tokens.length; i++) {
    const n = tokens[i]

    // Give name to un-named single tokens
    if (n.groupType === 'single' && n.named === true) {
      index += 1
      n.named = index
      continue
    }

    // Start converting tokens
    if (n.groupType === 'start') {
      convert = true
      if (isNamed(n.named)) {
        current = n.named
      } else {
        index += 1
        current = index
      }
    }

    // Ensure this token has the right name
    if (convert) {
      n.named = current
    }

    // Stop converting tokens
    if (n.groupType === 'end') {
      convert = false
    }
  }
  return tokens
}

const useOneOf = function (tokens) {
  return tokens.map(token => {
    if (token.choices !== undefined) {
      // are they all straight non-optional words?
      let shouldPack = token.choices.every(c => c.optional !== true && c.negative !== true && c.word !== undefined)
      if (shouldPack === true) {
        let oneOf = {}
        token.choices.forEach(c => (oneOf[c.word] = true))
        token.oneOf = oneOf
        delete token.choices
      }
    }
    return token
  })
}

const postProcess = function (tokens) {
  // ensure all capture groups are filled between start and end
  // give all capture groups names
  let count = tokens.filter(t => t.groupType).length
  if (count > 0) {
    tokens = fillGroups(tokens)
  }
  // convert 'choices' format to 'oneOf' format
  tokens = useOneOf(tokens)
  // console.log(tokens)

  return tokens
}
module.exports = postProcess
