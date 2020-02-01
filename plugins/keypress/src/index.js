const addMethods = function(Doc, world, nlp) {
  let sentenceCache = {}

  /** memoize tagger per-sentence */
  nlp.keypress = function(str, options) {
    //do a quick-parse on the text
    let doc = nlp.tokenize(str, options)
    let arr = doc.json({ terms: false })

    let list = []
    arr.forEach(o => {
      //do we already have it parsed?
      if (sentenceCache.hasOwnProperty(o.text) === true) {
        //use the cache
        list.push(sentenceCache[o.text].data)
        sentenceCache[o.text].used = true
        // console.log('used cache: ', o.text, '\n')
      } else {
        //otherwise, parse it!
        let json = nlp(o.text, options).json(0)
        //cache it
        sentenceCache[o.text] = {
          data: json,
          used: true,
        }
        // used[o.text] = true
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

    return nlp.fromJSON(list)
  }

  /** clear the sentence cache */
  nlp.clear = function() {
    sentenceCache = {}
  }

  /**  undocumented function for debugging the plugin **/
  nlp._sentenceCache = function() {
    return sentenceCache
  }
}

module.exports = addMethods
