// a comma, but not a clause break
const notClause = [
  '@hasComma @hasComma', //fun, cool...
  '@hasComma (and|or) .', //cool, and fun
  '(#City && @hasComma) #Country', //'toronto, canada'
  '(#WeekDay && @hasComma) #Date', //'tuesday, march 2nd'
  '(#Date+ && @hasComma) #Val', //'july 6, 1992'
  '(#Adj && @hasComma) #Adj', //nice, pretty
  // '@hasComma (too|also)$', //at end of sentence
]

const byComma = function (doc) {
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
    return !notClause.some(str => more.has(str))
  })
  return doc.splitAfter(commas)
}

// should we split-out a clause (in brackets)?
const splitParentheses = function (doc) {
  let matches = doc.parentheses()
  matches = matches.filter(m => {
    return m.wordCount() >= 3 && m.has('#Verb') && m.has('#NN')
  })
  return doc.splitOn(matches)
}

// split-out a long quotion, but not 'inline quotes'.
const splitQuotes = function (doc) {
  let matches = doc.quotations()
  matches = matches.filter(m => {
    return m.wordCount() >= 3 && m.has('#Verb') && m.has('#NN')
  })
  return doc.splitOn(matches)
}

// split a clause before these
const splitBefore = [
  // ... said John.
  '(said|says) #Prop$',
  // ... if it was
  '. . if .{4}',
  // various conjunctions
  'and while',
  'now that',
  'ever since',
  '(supposing|although)',
  'even (while|if|though)',
  '(whereas|whose)',
  // 'as (far|long|much|soon) as',
  'as (though|if)',
  '(til|until)',
]

const clauses = function (n) {
  let found = this

  found = splitParentheses(found)
  found = splitQuotes(found)

  found = byComma(found)

  found = found.splitAfter('(@hasEllipses|@hasSemicolon|@hasDash|@hasColon)')

  // i said
  found = found.splitAfter('^#Pron (said|says)')
  splitBefore.forEach(str => {
    found = found.splitBefore(str)
  })

  // it is cool but it is ..
  const m = found.match('#Verb .* [but] .* #Verb', 0)
  if (m.found) {
    found = found.splitBefore(m)
  }
  // it is cool and it is ..
  // let conjunctions = found.if('#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb').match('#Conjunction')
  // found = found.splitBefore(conjunctions)

  // if it is this then that
  const condition = found.if('if .{2,9} then .').match('then')
  found = found.splitBefore(condition)

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
