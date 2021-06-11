// looking at the previous word:
const leftTags = [
  ['Adjective', 'Noun'], //36% - blue dress
  ['Possessive', 'Noun'], //41% - his song
  ['Determiner', 'Noun'], //47% - the house
  ['Adverb', 'Verb'], //20% - quickly walk
  ['Pronoun', 'Verb'], //40% - he walks
  ['Value', 'Noun'], //47% - 2 houses
  ['Ordinal', 'Noun'], //53% - fifth house
  ['Modal', 'Verb'], //35% - should walk
  ['Superlative', 'Noun'], //43% - fastest car
  ['Demonym', 'Noun'], //38% - the hill
  ['Honorific', 'Person'], //dr. Smith
]

const leftWords = [
  ['i', 'Verb'], //44% //i walk..
  ['first', 'Noun'], //50% //first principles..
  ['it', 'Verb'], //33%
  ['there', 'Verb'], //35%
  ['not', 'Verb'], //33%
  ['because', 'Noun'], //31%
  ['if', 'Noun'], //32%
  ['but', 'Noun'], //26%
  ['who', 'Verb'], //40%
  ['this', 'Noun'], //37%
  ['his', 'Noun'], //48%
  ['when', 'Noun'], //33%
  ['you', 'Verb'], //35%
  ['very', 'Adjective'], // 39%
  ['old', 'Noun'], //51%
  ['never', 'Verb'], //42%
  ['before', 'Noun'], //28%
  ['a', 'Singular'],
  ['the', 'Singular'],
]

// looking at the next word:
const rightTags = [
  ['Copula', 'Noun'], //44% //spencer is
  ['PastTense', 'Noun'], //33% //spencer walked
  ['Conjunction', 'Noun'], //36%
  ['Modal', 'Noun'], //38%
  ['Pluperfect', 'Noun'], //40%
  ['PerfectTense', 'Verb'], //32%
]
const rightWords = [
  ['there', 'Verb'], //23% // be there
  ['me', 'Verb'], //31% //see me
  ['man', 'Adjective'], // 80% //quiet man
  ['only', 'Verb'], //27% //sees only
  ['him', 'Verb'], //32% //show him
  ['were', 'Noun'], //48% //we were
  ['took', 'Noun'], //38% //he took
  ['himself', 'Verb'], //31% //see himself
  ['went', 'Noun'], //43% //he went
  ['who', 'Noun'], //47% //person who
  ['jr', 'Person'],
]

module.exports = { leftTags, leftWords, rightWords, rightTags }
