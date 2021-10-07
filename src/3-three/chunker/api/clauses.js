const clauses = function (n) {
  // an awkward way to disambiguate a comma use
  let commas = this.if('@hasComma')
    .ifNo('@hasComma @hasComma') //fun, cool...
    .ifNo('@hasComma . .? (and|or) .') //cool, and fun
    .ifNo('(#City && @hasComma) #Country') //'toronto, canada'
    .ifNo('(#WeekDay && @hasComma) #Date') //'tuesday, march 2nd'
    .ifNo('(#Date && @hasComma) #Year') //'july 6, 1992'
    .ifNo('@hasComma (too|also)$') //at end of sentence
    .match('@hasComma')
  let found = this.splitAfter(commas)

  // let quotes = found.quotations()
  // found = found.splitOn(quotes)

  // let parentheses = found.parentheses()
  // found = found.splitOn(parentheses)

  // it is cool and it is ..
  let conjunctions = found.if('#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb').match('#Conjunction')
  found = found.splitBefore(conjunctions)

  // if it is this then that
  let condition = found.if('if .{2,9} then .').match('then')
  found = found.splitBefore(condition)

  // misc clause partitions
  found = found.splitBefore('as well as .')
  found = found.splitBefore('such as .')
  found = found.splitBefore('in addition to .')

  // semicolons, dashes
  found = found.splitAfter('@hasSemicolon')
  found = found.splitAfter('@hasDash')

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
  let tooLong = found.filter(d => d.wordCount() > 5 && d.match('#Verb+').length >= 2)
  if (tooLong.found) {
    let m = tooLong.splitAfter('#Noun .* #Verb .* #Noun+')
    found = found.splitOn(m.eq(0))
  }

  if (typeof n === 'number') {
    found = found.get(n)
  }
  return found
}

export default clauses
