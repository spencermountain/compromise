// order here matters

const mapping = [
  // adverbs
  ['Comparative', 'RBR'],
  ['Superlative', 'RBS'],
  ['Adverb', 'RB'],

  // adjectives
  ['Comparative', 'JJR'],
  ['Superlative', 'JJS'],
  ['Adjective', 'JJ'],
  ['TO', 'Conjunction'],

  // verbs
  ['Modal', 'MD'],
  ['Auxiliary', 'MD'],
  ['Gerund', 'VBG'], //throwing
  ['PastTense', 'VBD'], //threw
  ['Participle', 'VBN'], //thrown
  ['Infinitive', 'VBP'], //throw
  ['PresentTense', 'VBZ'], //throws
  ['Particle', 'RP'], //phrasal particle
  ['Verb', 'VB'], // throw

  // pronouns
  ['Possessive', 'POS'],
  ['Pronoun', 'PRP'],

  // misc
  ['Cardinal', 'CD'],
  ['Conjunction', 'CC'],
  ['Determiner', 'DT'],
  ['Preposition', 'IN'],
  ['Determiner', 'WDT'],
  ['Expression', 'FW'],
  ['QuestionWord', 'WP'],
  ['Expression', 'UH'],

  //nouns
  ['ProperNoun', 'NNP'],
  ['Person', 'NNP'],
  ['Place', 'NNP'],
  ['Organization', 'NNP'],
  // ['ProperNoun', 'NNPS'],
  ['Plural', 'NNS'],
  ['Noun', 'NN'],

  // ['Noun', 'EX'], //'there'
  // ['Adverb', 'WRB'],
  // ['Noun', 'PDT'], //predeterminer
  // ['Noun', 'SYM'], //symbol
  // ['Noun', 'NFP'], //
]
module.exports = mapping
