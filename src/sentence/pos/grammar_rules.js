module.exports = [
  //determiner hints
  {
    'before': ['[Determiner]', '[?]'],
    'after': ['[Determiner]', '[Noun]']
  },
  {
    'before': ['the', '[Verb]'],
    'after': [null, '[Noun]']
  },
  {
    'before': ['[Determiner]', '[Adjective]', '[Verb]'],
    'after': ['[Noun]', '[Noun]', '[Noun]']
  },
  {
    'before': ['[Determiner]', '[Adverb]', '[Adjective]', '[?]'],
    'after': ['[Determiner]', '[Adverb]', '[Adjective]', '[Noun]'],
  },
  {
    'before': ['[?]', '[Determiner]', '[Noun]'],
    'after': ['[Verb]', '[Determiner]', '[Noun]'],
  },
  //"peter the great"
  {
    'before': ['[Person]', 'the', '[Noun]'],
    'after': ['[Person]', null, '[Noun]']
  },
  // //"book the flight"
  {
    'before': ['[Noun]', 'the', '[Noun]'],
    'after': ['[Verb]', null, '[Noun]']
  },

  //posessive hints
  {
    'before': ['[Posessive]', '[?]'],
    'after': ['[Posessive]', '[Noun]'],
  },
  {
    'before': ['[Posessive]', '[Verb]'],
    'after': ['[Posessive]', '[Noun]'],
  },
  {
    'before': ['[?]', '[Posessive]', '[Noun]'],
    'after': ['[Verb]', '[Posessive]', '[Noun]'],
  },
  //copula hints
  {
    'before': ['[Copula]', '[?]'],
    'after': ['[Copula]', '[Adjective]'], // not sure
  },
  {
    'before': ['[Copula]', '[Adverb]', '[?]'],
    'after': ['[Copula]', '[Adverb]', '[Adjective]'], // not sure
  },
  //preposition hints
  {
    'before': ['[?]', '[Preposition]'],
    'after': ['[Verb]', '[Preposition]'],
  },
  //conjunction hints, like lists (a little sloppy)
  {
    'before': ['[Adverb]', '[Conjunction]', '[Adverb]'],
    'after': ['[Adverb]', '[Adverb]', '[Adverb]'],
  },
  {
    'before': ['[Verb]', '[Conjunction]', '[Verb]'],
    'after': ['[Verb]', '[Verb]', '[Verb]'],
  },
  {
    'before': ['[Noun]', '[Conjunction]', '[Noun]'],
    'after': ['[Noun]', '[Noun]', '[Noun]'],
  },
  {
    'before': ['[Adjective]', '[Conjunction]', '[Adjective]'],
    'after': ['[Adjective]', '[Adjective]', '[Adjective]'],
  },
  {
    'before': ['[?]', '[Conjunction]', '[Verb]'],
    'after': ['[Verb]', '[Conjunction]', '[Verb]'],
  },
  {
    'before': ['[Verb]', '[Conjunction]', '[?]'],
    'after': ['[Verb]', '[Conjunction]', '[Verb]'],
  },
  //adverb hints
  {
    'before': ['[Noun]', '[Adverb]', '[Noun]'],
    'after': ['[Noun]', '[Adverb]', '[Verb]'],
  },
  //pronoun hints
  {
    'before': ['[?]', '[Pronoun]'],
    'after': ['[Verb]', '[Pronoun]'],
  },
  //modal hints
  {
    'before': ['[Modal]', '[?]'],
    'after': ['[Modal]', '[Verb]'],
  },
  {
    'before': ['[Modal]', '[Adverb]', '[?]'],
    'after': ['[Modal]', '[Adverb]', '[Verb]'],
  },
  //ambiguous dates (march/may)
  {
    'before': ['[Modal]', '[Value]'],
    'after': ['[Modal]', '[Verb]'],
  },
  {
    'before': ['[Adverb]', '[Value]'],
    'after': ['[Adverb]', '[Verb]'],
  }
];
