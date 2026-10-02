// order matters
const matches = [
  // u r cool
  { match: 'u r', tag: '#Pronoun #Copula', reason: 'u-r' },
  // the captain [who]
  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' },
  // who is [that]?
  { match: '^#QuestionWord #Adverb+? #Copula #Adverb+? [(this|that|these|those)] #Adverb+?$', group: 0, tag: 'Pronoun', reason: 'who-is-that' },
  // I like [this]
  { match: '#Verb [(this|that|these|those)] #Adverb+? (yesterday|today|tonight|tomorrow)?$', group: 0, tag: 'Pronoun', reason: 'dem-obj' },
  // some sort of
  { match: 'some sort of', tag: 'Determiner Noun Preposition', reason: 'some-sort-of' },
  // of some sort
  { match: 'of some sort', tag: 'Preposition Determiner Noun', reason: 'of-some-sort' },
  // [some] eat apples
  { match: '^[some] #Infinitive #Noun', group: 0, tag: 'Pronoun', reason: 'some-subj' },
  // put it [there]
  { match: '(put|puts|putting|place|placed|leave|left) #Pronoun [there]', group: 0, tag: 'Adverb', reason: 'loc-there' },
  // [such] skill
  { match: '[such] (a|an|is)? #Noun', group: 0, tag: 'Determiner', reason: 'such-skill' },
  // [right] after
  // left-right: { match: '[right] (before|after|in|into|to|toward)', group: 0, tag: '#Adverb', reason: 'right-into' },
  // at [about]
  // left-right: { match: '#Preposition [about]', group: 0, tag: 'Adverb', reason: 'at-about' },
  // are [ya]
  { match: '(are|#Modal|see|do|for) [ya]', group: 0, tag: 'Pronoun', reason: 'are-ya' },
  // [long live] the king
  { match: '[long live] .', group: 0, tag: '#Adverb #Infinitive', reason: 'long-live' },
  // [plenty] of
  // left-right: { match: '[plenty] of', group: 0, tag: '#Uncountable', reason: 'plenty-of' },
  // always [there]
  // left-right: { match: '(always|nearly|barely|practically) [there]', group: 0, tag: 'Adjective', reason: 'always-there' },
  // [there] she is
  { match: '[there] (#Adverb|#Pronoun)? #Copula', group: 0, tag: 'There', reason: 'there-is' },
  // is [there] food
  { match: '#Copula [there] .', group: 0, tag: 'There', reason: 'is-there' },
  // should [there]
  { match: '#Modal #Adverb? [there]', group: 0, tag: 'There', reason: 'should-there' },
  // [do] you
  { match: '^[do] (you|we|they)', group: 0, tag: 'QuestionWord', reason: 'do-you' },
  // [does] he
  { match: '^[does] (he|she|it|#ProperNoun)', group: 0, tag: 'QuestionWord', reason: 'does-he' },
  // the person [who] runs
  { match: '#Determiner #Noun+ [who] #Verb', group: 0, tag: 'Preposition', reason: 'x-who' },
  // the person [which] eats
  { match: '#Determiner #Noun+ [which] #Verb', group: 0, tag: 'Preposition', reason: 'x-which' },
  // a [while]
  // left-right: { match: 'a [while]', group: 0, tag: 'Noun', reason: 'a-while' },
  // guess who
  { match: 'guess who', tag: '#Infinitive #QuestionWord', reason: 'guess-who' },
  // [fucking] ridiculous
  { match: '[fucking] !#Verb', group: 0, tag: '#Gerund', reason: 'f-as-ger' },
  // see [no]
  // left-right: { match: '#Verb [no]', group: 0, tag: 'Negative', reason: 'see-no' },
  // than [mine]
  // left-right: { match: '(then|than) [mine]', group: 0, tag: 'Possessive', reason: 'than-mine' },
]
export default matches
