
/*
Instruction

Statement
Statement/Action - she walked home, i could have seen
Statement/Definition - Tootsie is a movie
Statement/Description - he is tall

Question
Question/Time
Question/Amount



*/

const factType = function (vb) {
  if (vb.has('#Imperative')) {
    return 'Instruction'
  }
  if (vb.has('#Copula')) {
    return 'Fact'
  }
  return 'Action'
}

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
  let facts = []
  let fact = { type: null }
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
        fact.modifiers = fact.modifiers || {}
        fact.modifiers[prop] = nounObj
      } else {
        // after our action, no property
        fact.obj = nounObj
      }
    } else if (chunk.isVerb().found) {
      // our second verb?
      if (fact.action) {
        facts.push(fact)
        fact = { type: null }
      }
      fact.type = factType(chunk)
      // if (fact.type === 'Action' || fact.type === 'Instruction') {
      fact.action = parseVerb(chunk)
      // }
    } else {
      //glue chunk
      prop = chunk.text('machine')
    }
  })
  if (fact.action) {
    facts.push(fact)
  }
  return facts
}
export default getFacts