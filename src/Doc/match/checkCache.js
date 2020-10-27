// cache the easier conditions up-front
const cacheRequired = function (reg) {
  let needTags = []
  let needWords = []
  reg.forEach(obj => {
    if (obj.optional === true || obj.negative === true) {
      return
    }
    if (obj.tag !== undefined) {
      needTags.push(obj.tag)
    }
    if (obj.word !== undefined) {
      needWords.push(obj.word)
    }
  })
  return { tags: needTags, words: needWords }
}

const failFast = function (doc, regs) {
  if (doc._cache && doc._cache.set === true) {
    let { words, tags } = cacheRequired(regs)
    //check required words
    for (let i = 0; i < words.length; i++) {
      if (doc._cache.words[words[i]] === undefined) {
        return false
      }
    }
    //check required tags
    for (let i = 0; i < tags.length; i++) {
      if (doc._cache.tags[tags[i]] === undefined) {
        return false
      }
    }
  }
  return true
}
module.exports = failFast
