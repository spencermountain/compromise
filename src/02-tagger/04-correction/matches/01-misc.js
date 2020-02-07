// order matters
const list = [
  { match: '#Value [(foot|feet)]', group: 0, tag: 'Unit', reason: 'foot-unit' }, //'u' as pronoun
  { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' }, //6 am

  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' }, //timezones
  { match: '#Demonym #Currency', tag: 'Currency', reason: 'demonym-currency' }, //about to go
  { match: '[about to] #Adverb? #Verb', group: 0, tag: ['Auxiliary', 'Verb'], reason: 'about-to' }, //right of way

  { match: 'a bit much', tag: 'Determiner Adverb Adjective', reason: 'bit-3' },
  { match: 'too much', tag: 'Adverb Adjective', reason: 'bit-4' }, // u r cool
  { match: 'u r', tag: 'Pronoun Copula', reason: 'u r' }, // well, ...

  //let him glue
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    group: 0,
    tag: '#Infinitive',
    reason: 'let-him-glue',
  },

  //swear-words as non-expression POS
  //nsfw
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // is f*ed up
  { match: '#Copula [fucked up?]', tag: 'Adjective', reason: 'swears-adjective' },

  { match: '[so] #Noun', group: 0, tag: 'Conjunction', reason: 'so-conj' }, //do so
  { match: 'do [so]', group: 0, tag: 'Noun', reason: 'so-noun' },

  //all students
  { match: '#Verb #Adverb? #Noun [(that|which)]', group: 0, tag: 'Preposition', reason: 'that-prep' }, //that car goes
  { match: 'that #Noun [#Verb]', group: 0, tag: 'Determiner', reason: 'that-determiner' }, //work, which has been done.
  { match: '@hasComma [which] (#Pronoun|#Verb)', group: 0, tag: 'Preposition', reason: 'which-copula' },
  { match: 'just [like]', group: 0, tag: 'Preposition', reason: 'like-preposition' }, //folks like her
  { match: '#Noun [like] #Noun', group: 0, tag: 'Preposition', reason: 'noun-like' }, //look like

  //District of Foo
  {
    match: '(district|region|province|municipality|territory|burough|state) of #ProperNoun',

    tag: 'Region',
    reason: 'district-of-Foo',
  },

  //fix for busted-up phrasalVerbs
  { match: '#Noun [#Particle]', group: 0, tag: 'Preposition', reason: 'repair-noPhrasal' },
  //Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', reason: 'thing-doer' },

  // schools
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },

  //this rocks
  { match: '(this|that) [#Plural]', group: 0, tag: 'PresentTense', reason: 'this-verbs' },

  //the word 'second'
  // doc
  // .match('[second] #Noun', 0)
  // .notIf('#Honorific')
  // .unTag('Unit')
  // .tag('Ordinal', 'second-noun')

  {
    match: '[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person',
    group: 0,
    tag: 'Honorific',
    reason: 'ambg-honorifics',
  },

  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },

  //'u' as pronoun
  { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },

  //the word 'how'
  { match: '^how', tag: 'QuestionWord', reason: 'how-question' },
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // //the word 'which'
  { match: '^which', tag: 'QuestionWord', reason: 'which-question' },
  { match: '[which] . (#Noun)+ #Pronoun', group: 0, tag: 'QuestionWord', reason: 'which-question2' },
  { match: 'which', tag: 'QuestionWord', reason: 'which-question3' },

  //sometimes adverbs - 'pretty good','well above'
  {
    match: '#Copula (pretty|dead|full|well) (#Adjective|#Noun)',
    tag: '#Copula #Adverb #Adjective',
    reason: 'sometimes-adverb',
  },

  //how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  },
  {
    match: '[(who|what|where|why|how|when)] #Noun #Adverb? #Infinitive not? #Gerund',
    group: 0,
    tag: 'Conjunction',
    reason: 'when i go fishing',
  },

  // { match: '', group: 0, tag: , reason: '' },
]

// let obj = {}
// list.forEach(a => {
//   if (obj[a.match] === true) {
//     console.log(a.match)
//   }
//   obj[a.match] = true
//   console.log(a.tag)
// })
module.exports = list
