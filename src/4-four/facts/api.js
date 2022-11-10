
const parseVerb = function (chunk) {
  let obj = chunk.verbs().json()[0].verb
  return {
    desc: obj.preAdverbs.concat(obj.postAdverbs),
    root: obj.infinitive,
    tense: obj.grammar.tense
  }
}

const parseNoun = function (chunk) {
  let obj = chunk.nouns().json()[0].noun
  return obj
}

const getFacts = function (s) {
  let fact = {}
  let prop = null
  let chunks = s.chunks()
  chunks.forEach(chunk => {
    if (chunk.isNoun().found) {
      let nounObj = parseNoun(chunk)
      // before our action, we are the subject
      if (!fact.action) {
        fact.subject = nounObj
      } else if (prop) {
        // walk [to] [the store]
        fact.mod = fact.mod || {}
        fact.mod[prop] = nounObj
      } else {
        // after our action, no property
        fact.obj = nounObj
      }
    } else if (chunk.isVerb().found) {
      fact.action = parseVerb(chunk)
    } else {
      //glue chunk
      prop = chunk.text('machine')
    }
  })
  return [fact]
}

const api = function (View) {
  /** */
  View.prototype.facts = function () {
    let facts = []
    this.sentences().forEach(s => {
      facts = facts.concat(getFacts(s))
    })
    return facts
  }
}
export default api
