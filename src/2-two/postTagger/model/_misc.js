// order matters
const matches = [
  // u r cool
  { match: 'u r', hook: 'r', tag: '#Pronoun #Copula', reason: 'u r' },
  // the captain who
  { match: '#Noun [(who|whom)]', hook: '#Noun', group: 0, tag: 'Determiner', reason: 'captain-who' },
  // who is that?
  { match: '^#QuestionWord #Adverb+? #Copula #Adverb+? [(this|that|these|those)] #Adverb+?$', hook: '#QuestionWord', group: 0, tag: 'Pronoun', reason: 'who-is-that' },
  // I like this
  { match: '#Verb [(this|that|these|those)] #Adverb+? (yesterday|today|tonight|tomorrow)?$', hook: '#Verb', group: 0, tag: 'Pronoun', reason: 'demonstrative-object' },
  // some sort of
  { match: 'some sort of', hook: 'sort', tag: 'Adjective Noun Conjunction', reason: 'some-sort-of' },
  // of some sort
  { match: 'of some sort', hook: 'sort', tag: 'Conjunction Adjective Noun', reason: 'of-some-sort' },
  // such skill
  { match: '[such] (a|an|is)? #Noun', hook: 'such', group: 0, tag: 'Determiner', reason: 'such-skill' },
  // right after
  { match: '[right] (before|after|in|into|to|toward)', hook: 'right', group: 0, tag: '#Adverb', reason: 'right-into' },
  // at about
  { match: '#Preposition [about]', hook: 'about', group: 0, tag: 'Adjective', reason: 'at-about' },
  // are ya
  { match: '(are|#Modal|see|do|for) [ya]', hook: 'ya', group: 0, tag: 'Pronoun', reason: 'are-ya' },
  // long live the king
  { match: '[long live] .', hook: 'live', group: 0, tag: '#Adjective #Infinitive', reason: 'long-live' },
  // plenty of
  { match: '[plenty] of', hook: 'plenty', group: 0, tag: '#Uncountable', reason: 'plenty-of' },
  // always there
  { match: '(always|nearly|barely|practically) [there]', hook: 'there', group: 0, tag: 'Adjective', reason: 'always-there' },
  // there she is
  { match: '[there] (#Adverb|#Pronoun)? #Copula', hook: 'there', group: 0, tag: 'There', reason: 'there-is' },
  // is there food
  { match: '#Copula [there] .', hook: 'there', group: 0, tag: 'There', reason: 'is-there' },
  // should there
  { match: '#Modal #Adverb? [there]', hook: 'there', group: 0, tag: 'There', reason: 'should-there' },
  // do you
  { match: '^[do] (you|we|they)', hook: 'do', group: 0, tag: 'QuestionWord', reason: 'do-you' },
  // does he
  { match: '^[does] (he|she|it|#ProperNoun)', hook: 'does', group: 0, tag: 'QuestionWord', reason: 'does-he' },
  // the person who runs
  { match: '#Determiner #Noun+ [who] #Verb', hook: 'who', group: 0, tag: 'Preposition', reason: 'the-x-who' },
  // the person which eats
  { match: '#Determiner #Noun+ [which] #Verb', hook: 'which', group: 0, tag: 'Preposition', reason: 'the-x-which' },
  // a while
  { match: 'a [while]', hook: 'while', group: 0, tag: 'Noun', reason: 'a-while' },
  // guess who
  { match: 'guess who', hook: 'who', tag: '#Infinitive #QuestionWord', reason: 'guess-who' },
  // fucking ridiculous
  { match: '[fucking] !#Verb', hook: 'fucking', group: 0, tag: '#Gerund', reason: 'f-as-gerund' },
  // see no
  { match: '#Verb [no]', hook: 'no', group: 0, tag: 'Negative', reason: 'see-no' },
  // than mine
  { match: '(then|than) [mine]', hook: 'mine', group: 0, tag: 'Possessive', reason: 'than-mine' },
]
export default matches
