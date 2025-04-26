const sentenceCache = {}

/** memoize tagger per-sentence */
const keyPress = function (text, lex, opts = {}) {
  const nlp = this
  const splitSentences = this.methods().one.tokenize.splitSentences
  const arr = splitSentences(text, this.world())

  const list = []
  arr.forEach(str => {
    //do we already have it parsed?
    if (sentenceCache.hasOwnProperty(str) === true) {
      //use the cache
      list.push(sentenceCache[str].data)
      sentenceCache[str].used = true
      // console.log('used cache: ', str, '\n')
    } else {
      //otherwise, parse it!
      if (opts.verbose) {
        console.log(`parsing: '${str}'\n`)//eslint-disable-line
      }
      const json = nlp(str, lex).json(0)
      //cache it
      sentenceCache[str] = {
        data: json,
        used: true,
      }
      list.push(json)
    }
  })
  // delete any unused cache
  Object.keys(sentenceCache).forEach(k => {
    if (sentenceCache[k].used !== true) {
      delete sentenceCache[k]
    } else {
      sentenceCache[k].used = null
    }
  })
  if (opts.verbose) {
    console.log(`${Object.keys(sentenceCache).length}' sentences in cache\n`)//eslint-disable-line
  }
  return nlp(list)
}

export default {
  lib: {
    keyPress
  }
}
