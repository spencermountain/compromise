export default {
  // looking at the previous word's tags:
  leftTags: [
    ['Adjective', 'Noun'],
    ['Possessive', 'Noun'],
    ['Determiner', 'Noun'],
    ['Adverb', 'Verb'],
    ['Pronoun', 'Verb'],
    ['Value', 'Noun'],
    ['Ordinal', 'Noun'],
    ['Modal', 'Verb'],
    ['Superlative', 'Noun'],
    ['Demonym', 'Noun'],
    ['Honorific', 'Person'], //dr. Smith
  ],
  // looking at the previous word:
  leftWords: [
    ['i', 'Verb'],
    ['first', 'Noun'],
    ['it', 'Verb'],
    ['there', 'Verb'],
    ['not', 'Verb'],
    ['because', 'Noun'],
    ['if', 'Noun'],
    ['but', 'Noun'],
    ['who', 'Verb'],
    ['this', 'Noun'],
    ['his', 'Noun'],
    ['when', 'Noun'],
    ['you', 'Verb'],
    ['very', 'Adjective'],
    ['old', 'Noun'],
    ['never', 'Verb'],
    ['before', 'Noun'],
    ['a', 'Singular'],
    ['the', 'Noun'],
  ],

  // looking at the next word's tags:
  rightTags: [
    ['Copula', 'Noun'],
    ['PastTense', 'Noun'],
    ['Conjunction', 'Noun'],
    ['Modal', 'Noun'],
    ['Pluperfect', 'Noun'],
    ['PerfectTense', 'Verb'], //32%
  ],
  // looking at the next word:
  rightWords: [
    ['there', 'Verb'],
    ['me', 'Verb'],
    ['man', 'Adjective'],
    ['only', 'Verb'],
    ['him', 'Verb'],
    ['were', 'Noun'],
    ['took', 'Noun'],
    ['himself', 'Verb'],
    ['went', 'Noun'],
    ['who', 'Noun'],
    ['jr', 'Person'],
  ],
}
