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
    'Adjective',
    'Adverb'
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
  ],
  cyan: [
    'Preposition',
    'Conjunction',
    'Determiner',
  ]
};
module.exports = Object.keys(colors).reduce((h, c) => {
  colors[c].forEach((str) => {
    h[str] = c;
  });
  return h;
}, {});
