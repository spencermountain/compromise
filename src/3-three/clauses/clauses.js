// a comma, but not a clause break
const notClause = [
  '@hasComma @hasComma', //fun, cool...
  '(#City && @hasComma) #Country', //'toronto, canada'
  '(#WeekDay && @hasComma) #Date', //'tuesday, march 2nd'
  '(#Date+ && @hasComma) #Val', //'july 6, 1992'
  '(#Adj && @hasComma) #Adj', //nice, pretty
]

const byComma = function (doc, rules) {
  const skip = notClause.concat(rules.notClause || [])
  let commas = doc.match('@hasComma')
  // remove any non-clause uses
  commas = commas.filter(m => {
    // don't split the first word
    if (m.growLeft('.').wordCount() === 1) {
      return false
    }
    // don't split the last word
    if (m.growRight('. .').wordCount() === 1) {
      return false
    }
    const more = m.grow('.') // grow by 1 word in either direction
    return !skip.some(str => more.has(str))
  })
  return doc.splitAfter(commas)
}

// should we split-out a clause (in brackets)?
const splitParentheses = function (doc) {
  // from the misc plugin
  if (!doc.parentheses) {
    return doc
  }
  let matches = doc.parentheses()
  matches = matches.filter(m => {
    return m.wordCount() >= 3 && m.has('#Verb') && m.has('#NN')
  })
  return doc.splitOn(matches)
}

// split-out a long quotion, but not 'inline quotes'.
const splitQuotes = function (doc) {
  // from the misc plugin
  if (!doc.quotations) {
    return doc
  }
  let matches = doc.quotations()
  matches = matches.filter(m => {
    return m.wordCount() >= 3 && m.has('#Verb') && m.has('#NN')
  })
  return doc.splitOn(matches)
}

const clauses = function (n) {
  let found = this
  // word-rules, like 'but' and 'until', are in the model
  const rules = this.model.three?.clauses || {}

  found = splitParentheses(found)
  found = splitQuotes(found)

  found = byComma(found, rules)

  found = found.splitAfter('(@hasEllipses|@hasSemicolon|@hasDash|@hasColon)')

  // each language's own rules
  const { splitAfter = [], splitBefore = [], splitBeforeGroup = [] } = rules
  splitAfter.forEach(str => {
    found = found.splitAfter(str)
  })
  splitBefore.forEach(str => {
    found = found.splitBefore(str)
  })
  splitBeforeGroup.forEach(str => {
    const m = found.match(str, 0)
    if (m.found) {
      found = found.splitBefore(m)
    }
  })

  // // misc clause partitions
  // found = found.splitBefore('as well as .')
  // found = found.splitBefore('such as .')
  // found = found.splitBefore('in addition to .')

  // // semicolons, dashes
  // found = found.splitAfter('@hasSemicolon')
  // found = found.splitAfter('@hasDash')

  // //
  // found = found.splitBefore('which (were|are|will)')

  // // he said [...]
  // found = found.splitAfter('#Noun (said|say|says)')

  // passive voice verb - '.. which was robbed is empty'
  // let passive = found.match('#Noun (which|that) (was|is) #Adverb? #PastTense #Adverb?')
  // if (passive.found) {
  //   found = found.splitAfter(passive)
  // }
  // //which the boy robbed
  // passive = found.match('#Noun (which|that) the? #Noun+ #Adverb? #PastTense #Adverb?')
  // if (passive.found) {
  //   found = found.splitAfter(passive)
  // }
  // does there appear to have relative/subordinate clause still?
  // let tooLong = found.filter(d => d.wordCount() > 5 && d.match('#Verb+').length >= 2)
  // if (tooLong.found) {
  //   // and after the ..
  //   found = found.splitBefore('#Conjunction #Preposition')

  //   // let m = tooLong.splitAfter('#Noun .* #Verb .* #Noun+')
  //   // found = found.splitOn(m.eq(0))
  // }
  if (typeof n === 'number') {
    found = found.get(n)
  }
  return found
}

export default clauses
