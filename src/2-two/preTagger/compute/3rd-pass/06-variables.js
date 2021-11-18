import fastTag from '../_fastTag.js'
const env = typeof process === 'undefined' ? self.env : process.env || {} // eslint-disable-line


// random ad-hoc changes  - 
const adhoc = {
  // Adjective|Gerund needs extra help
  'Adjective|Gerund': (terms, i) => {
    // 'is walking' vs 'is amazing'
    if (terms[i - 1] && terms[i - 1].tags.has('Copula')) {
      // if it's at the end
      if (!terms[i + 1]) {
        return 'Adjective'
      }
    }

  }
}
// 'was time' vs 'was working'
// gerundNoun.beforeWords.was = 'Gerund'
// 'waiting for'
// gerundNoun.afterWords.for = 'Gerund'
// she loves
// presentPlural.beforeTags.Pronoun = 'PresentTense'
// definetly warm

// delete nounVerb.afterTags.Noun


const checkWord = (term, obj) => {
  if (!term || !obj) {
    return false
  }
  const found = obj[term.normal] === true
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[2m\x1b[3m     ↓ - '${term.normal}' \x1b[0m`)
  }
  return found
}

const checkTag = (term, obj = {}) => {
  if (!term || !obj) {
    return false
  }
  // very rough sort, so 'Noun' is after ProperNoun, etc
  let tags = Array.from(term.tags).sort((a, b) => (a.length > b.length ? -1 : 1))
  const found = tags.find(tag => obj[tag] === true)
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[2m\x1b[3m      ↓ - '${term.normal}' (#${found})  \x1b[0m`)
  }
  return Boolean(found)
}

const pickTag = function (terms, i, a, b, clues) {
  let clueA = clues[a] || {}
  let clueB = clues[b] || {}
  if (!clueA || !clueB) {
    console.log('\nMissing', a, b)
  }
  // look -> right word, first
  let tag = null
  if (checkWord(terms[i + 1], clueA.afterWords)) {
    return a
  }
  if (checkWord(terms[i + 1], clueB.afterWords)) {
    return b
  }
  // look <- left word, second
  if (checkWord(terms[i - 1], clueA.beforeWords)) {
    return a
  }
  if (checkWord(terms[i - 1], clueB.beforeWords)) {
    return b
  }
  // look <- left tag 
  if (checkTag(terms[i - 1], clueA.beforeTags)) {
    return a
  }
  if (checkTag(terms[i - 1], clueB.beforeTags)) {
    return b
  }
  // look -> right tag
  if (checkTag(terms[i + 1], clueA.afterTags)) {
    return a
  }
  if (checkTag(terms[i + 1], clueB.afterTags)) {
    return b
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
  // should we ignore the switching stuff?
  if (term.tags.has('ProperNoun') || term.tags.has('Acronym')) {
    return
  }
  if (variables.hasOwnProperty(term.normal)) {
    let form = variables[term.normal]
    let [a, b] = form.split(/\|/)
    let tag = pickTag(terms, i, a, b, clues)
    // lean-harder on some variable forms
    if (adhoc[form]) {
      tag = adhoc[form](terms, i) || tag
    }
    // did we find anything?
    if (tag) {
      if (env.DEBUG_TAGS) {
        console.log(`\n  \x1b[32m [variable] - '${term.normal}' - (${form}) → #${tag} \x1b[0m\n`)
      }
      setTag(term, tag, model)
    }
  }
}
export default doVariables