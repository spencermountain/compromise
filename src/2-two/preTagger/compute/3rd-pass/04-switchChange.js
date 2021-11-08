/* eslint-disable no-console */
import fastTag from '../_fastTag.js'
// import fillTags from '../3rd-pass/_fillTags.js'

const env = typeof process === 'undefined' ? self.env : process.env || {} // eslint-disable-line


const lookAtWord = function (term, byWord) {
  if (!term) {
    return null
  }
  // look at word
  if (byWord.hasOwnProperty(term.normal)) {
    if (env.DEBUG_TAGS) {
      console.log(`  \x1b[32m→ #${byWord[term.normal]} (from ${term.normal}) \x1b[0m\n`)
    }
    return byWord[term.normal]
  }
  return null
}

const lookAtTag = function (term, byTag) {
  if (!term) {
    return null
  }
  // look at tags
  let tags = Array.from(term.tags)
  // very rough sort, so 'Noun' is after ProperNoun, etc
  tags = tags.sort((a, b) => (a.length > b.length ? -1 : 1))
  for (let i = 0; i < tags.length; i += 1) {
    if (byTag[tags[i]]) {
      if (env.DEBUG_TAGS) {
        console.log(`  \x1b[32m→ #${byTag[tags[i]]}  (from #${tags[i]}) \x1b[0m\n`)
      }
      return byTag[tags[i]]
    }
  }
  return null
}

const goodAlready = function (term) {
  const fine = ['ProperNoun', 'Acronym']
  return fine.some(tag => term.tags.has(tag))
}

const swtichLexicon = function (terms, i, model) {
  let term = terms[i]
  // do we already have a good tag?
  if (goodAlready(term)) {
    return
  }
  const { switchers } = model.two
  const keys = Object.keys(switchers)
  for (let o = 0; o < keys.length; o += 1) {
    const { words, beforeTags, afterTags, beforeWords, afterWords, ownTags } = switchers[keys[o]]
    if (words.hasOwnProperty(term.normal)) {
      if (env.DEBUG_TAGS) {
        console.log(`\n -=-=- '${term.text}' [switch] - (${keys[o]})`)
      }
      // look at term's own tags for obvious hints, first
      let tag = lookAtTag(terms[i], ownTags || {})
      // look -> right word
      tag = tag || lookAtWord(terms[i + 1], afterWords)
      // look <- left word, second
      tag = tag || lookAtWord(terms[i - 1], beforeWords)
      // look <- left tag next
      tag = tag || lookAtTag(terms[i - 1], beforeTags)
      // look -> right tag next
      tag = tag || lookAtTag(terms[i + 1], afterTags)
      // did we find anything?
      if (tag) {
        // is it a tag we don't have yet?
        if (!term.tags.has(tag)) {
          term.tags.clear()
          fastTag(term, tag, `3-[switch] ${keys[o]}`)
          if (model.two.tagSet[tag]) {
            let parents = model.two.tagSet[tag].parents
            fastTag(term, parents, `3-switch-infer from ${tag}`)
          }
          break //one hint is good-enough
        }
      }
    }
  }
}
export default swtichLexicon
