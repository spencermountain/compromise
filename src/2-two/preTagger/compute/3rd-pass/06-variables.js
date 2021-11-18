import fastTag from '../_fastTag.js'
const env = typeof process === 'undefined' ? self.env : process.env || {} // eslint-disable-line

const checkWord = (term, obj) => {
  if (!term || !obj) {
    return null
  }
  const found = obj[term.normal] === true
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[32m [variable] - '${term.normal}' \x1b[0m\n`)
  }
  return found
}

const checkTag = (term, obj = {}) => {
  if (!term || !obj) {
    return null
  }
  // very rough sort, so 'Noun' is after ProperNoun, etc
  let tags = Array.from(term.tags).sort((a, b) => (a.length > b.length ? -1 : 1))
  const found = tags.find(tag => obj[tag] === true)
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[32m [variable] - #${found} ('${term.normal}') \x1b[0m\n`)
  }
  return Boolean(found)
}

const pickTag = function (terms, i, a, b, clues) {
  let clueA = clues[a] || {}
  let clueB = clues[b] || {}
  // console.log(a, clueA)
  // console.log(b, clueB)
  // look -> right word
  let tag = checkWord(terms[i + 1], clueA.afterWords) ? a : null
  tag = tag || checkWord(terms[i + 1], clueB.afterWords) ? b : null
  // look <- left word, second
  tag = tag || checkWord(terms[i - 1], clueA.beforeWords) ? a : null
  tag = tag || checkWord(terms[i - 1], clueB.beforeWords) ? b : null
  if (tag === null) {
    // look <- left tag 
    tag = tag || checkTag(terms[i - 1], clueA.beforeTags) ? a : null
    tag = tag || checkTag(terms[i - 1], clueB.beforeTags) ? b : null
    // look -> right tag next
    tag = tag || checkTag(terms[i + 1], clueA.afterTags) ? a : null
    tag = tag || checkTag(terms[i + 1], clueB.afterTags) ? b : null
  }
  return tag
}

const setTag = function (term, tag, model) {
  if (!term.tags.has(tag)) {
    term.tags.clear()
    fastTag(term, tag, `3-[variable]`)
    if (model.two.tagSet[tag]) {
      let parents = model.two.tagSet[tag].parents
      fastTag(term, parents, `  -inferred by #${tag}`)
    }
  }
}

// words like 'bob' that can change between two tags
const doVariables = function (terms, i, model) {
  const { variables, clues } = model.two
  const term = terms[i]
  if (variables.hasOwnProperty(term.normal)) {
    let [a, b] = variables[term.normal].split(/\|/)
    const tag = pickTag(terms, i, a, b, clues)
    // did we find anything?
    if (tag) {
      setTag(term, tag, model)
    }
  }
}
export default doVariables