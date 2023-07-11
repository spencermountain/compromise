import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/verb-phrase] '

let arr = [

  // verb suffixes
  ['lied', '#PastTense'],
  ['lies', '#PresentTense'],
  ['owed', '#PastTense'],
  ['owes', '#PresentTense'],
  ['aced', '#PastTense'],
  ['vied', '#PastTense'],
  ['vies', '#PresentTense'],
  ['husked', '#PastTense'],
  ['husks', '#PresentTense'],
  ['masked', '#PastTense'],
  ['we planned', 'we #PastTense'],
  ['hummed', '#PastTense'],
  ['wash', '#Infinitive'],
  ['walked', '#PastTense'],
  ['rewash', '#Infinitive'],
  ['quickly re-wash', '#Adverb #Infinitive'],
  ['quickly re-washed', '#Adverb #PastTense'],
  ['quickly rewashed', '#Adverb #PastTense'],
  ['rewashes', '#PresentTense'],
  ['rewashing', '#Gerund'],
  ['purchase the milk', '#Infinitive the milk'],
  ['repurchase the milk', '#Infinitive the milk'],
  ['re-purchase', '#Infinitive'],
  ['unpurchase', '#Verb'],
  ['purchased', '#PastTense'],
  ['unpurchasing', '#Gerund'],
  ['unpurchases', '#Verb'],
  ['will resolve to fight', 'will #Infinitive to #Verb'],
  ['the resolve to fight', 'the #Singular to #Verb'],
  ['restructure', '#Infinitive'],
  ['reconcile', '#Infinitive'],
  ['repeat our ad', '#Infinitive #Possessive #Noun'],

  ['write off', '#Infinitive #PhrasalVerb'],
  ['writes off', '#PhrasalVerb #Particle'],
  ['wrote off', '#PastTense #Particle'],
  // ['tided over', '#PastTense #Particle'],


  //phrasal verb tense
  ['head-over', '#PresentTense #Particle'],
  ['head-under', '#PresentTense #Particle'],
  ['haze-over', '#PresentTense #Particle'],
  ['hazed-over', '#PastTense #Particle'],
  ['headed-over', '#PastTense #Particle'],
  ['heading-under', '#Gerund #Particle'],
  ['healing-over', '#Gerund #Particle'],

  //ambiguous adverbs
  ['it was pretty', '#Noun #Copula #Adjective'],
  ['it was pretty cool', '#Noun #Copula #Adverb #Adjective'],
  [`super-cool`, '#Adverb #Adjective'],
  ['it was really pretty cool', '#Noun #Copula #Adverb #Adverb #Adjective'],
  ['it was just', '#Noun #Copula #Adjective'],
  ['it was just gorgeous', '#Noun #Copula #Adverb #Adjective'],

  // modal verbs
  ['can buy', '#Modal #Verb'],
  ['he can', '#Pronoun #Verb'],
  ['the can', '#Determiner #Noun'],

  ['will earn', '#Modal #Verb'],
  ['they will', '#Pronoun #Verb'],
  ['the will', '#Determiner #Noun'],

  ['may leave', '#Verb #Infinitive'],
  ['they may', '#Pronoun #Verb'],
  ['this may was', '#Determiner #Noun #Copula'],

  [`walk in on`, '#PhrasalVerb #Particle #Preposition'],
  [`standing out in`, '#PhrasalVerb #Particle #Preposition'],
  [`stood up in`, '#PastTense #Particle #Preposition'],
  [`stood out on`, '#PastTense #Particle #Preposition'],
  [`walked out in`, '#PastTense #Particle #Preposition'],
  [`looked back on`, '#PastTense #Particle #Preposition'],
  // [`is back on`, '#Copula #Adjective #Preposition'],


  [`quite awfully swimming`, '#Adverb #Adverb #Verb'],
  ['is doing well', '#Copula #Gerund #Adverb'],
  [`I'm fuckin' around with two geese`, `#Pronoun #Copula #Gerund . #Preposition #Value #Plural`],

  // complex phrases
  ['we help stop tragedies', '#Pronoun #Verb #Verb #Plural'],
  ['he used to live', '#Noun #Verb #Verb #Infinitive'],

]
test('match:', function (t) {
  arr.forEach(function (a) {
    let [str, match] = a
    let doc = nlp(str).compute('tagRank')
    let tags = doc.json()[0].terms.map(term => term.tagRank[0])
    let m = doc.match(match)
    let msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})