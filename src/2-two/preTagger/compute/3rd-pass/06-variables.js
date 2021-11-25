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
  },
  // 'PresentTense|Plural': (terms, i) => {
  // if it's at the start 'prices ...'
  // if (i === 0) {
  //   return 'Plural'
  // }
  // }

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
    return null
  }
  const found = obj[term.normal]
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[2m\x1b[3m     ↓ - '${term.normal}' \x1b[0m`)
  }
  return found
}

const checkTag = (term, obj = {}) => {
  if (!term || !obj) {
    return null
  }
  // very rough sort, so 'Noun' is after ProperNoun, etc
  let tags = Array.from(term.tags).sort((a, b) => (a.length > b.length ? -1 : 1))
  let found = tags.find(tag => obj.hasOwnProperty(tag))
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[2m\x1b[3m      ↓ - '${term.normal}' (#${found})  \x1b[0m`)
  }
  found = obj[found]
  return found
}

const pickTag = function (terms, i, clues) {
  if (!clues) {
    return
  }
  // look -> right word, first
  let tag = checkWord(terms[i + 1], clues.afterWords)
  // look <- left word, second
  tag = tag || checkWord(terms[i - 1], clues.beforeWords)
  // look <- left tag 
  tag = tag || checkTag(terms[i - 1], clues.beforeTags)
  // look -> right tag
  tag = tag || checkTag(terms[i + 1], clues.afterTags)
  // console.log(clues)
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
    let form = variables[term.normal]
    // console.log(`\n'${term.normal}'  : ${form}`)
    // console.log(terms)

    // skip propernouns, acronyms, etc
    if (/^[A-Z]/.test(term.text) && form !== 'Month|Person') {
      return
    }
    let tag = pickTag(terms, i, clues[form])
    // lean-harder on some variable forms
    // if (adhoc[form]) {
    //   tag = adhoc[form](terms, i) || tag
    // }
    // did we find anything?
    if (tag) {
      if (env.DEBUG_TAGS) {
        console.log(`\n  \x1b[32m [variable] - '${term.normal}' - (${form}) → #${tag} \x1b[0m\n`)
      }
      setTag(term, tag, model)
    } else if (env.DEBUG_TAGS) {
      console.log('   -> x')
    }
  }
}
export default doVariables