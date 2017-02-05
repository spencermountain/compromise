//used for pretty-printing on the server-side
const colors = {
  blue: [
    'Noun',
    'Plural',
    'Singular',
    'Pronoun',
    'Possessive',
    'Place',
    'Person',
    'City',
  ],
  red: [
    'Value',
    'Ordinal',
    'Cardinal',
    'TextValue',
    'NumericValue'
  ],
  green: [
    'Verb',
    'Auxillary',
    'Negative',
    'PastTense',
    'PresentTense',
    'FutureTense',
    'Modal',
    'Infinitive',
    'Gerund',
    'Copula',
    'Participle',
  ],
  cyan: [
    'Preposition',
    'Conjunction',
    'Determiner',
  ],
  black: [
    'Adjective',
    'Adverb'
  ]
};
module.exports = Object.keys(colors).reduce((h, c) => {
  colors[c].forEach((str) => {
    h[str] = c;
  });
  return h;
}, {});
