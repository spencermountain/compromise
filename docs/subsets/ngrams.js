'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the n-grams in this text',
    example: 'nlp(\'love love me do.\').ngrams().data()\n//[{text:\'love\', count:2, size:1}..]',
    returns: 'array'
  },
  unigrams: {
    desc: 'return only the ngrams of size 1',
    returns: 'Text',
    example: 'nlp(\'University of Toronto, in toronto\').ngrams().unigrams(0).data()\n//[{normal:\'toronto\', count:2, size:1}]'
  },
  bigrams: {
    desc: 'return only the ngrams of size 2',
    returns: 'Text',
    example: 'nlp(\'The University of Ryerson and University of Toronto, in toronto\').ngrams().bigrams(0).data()\n//[{normal:\'university of\', count:2, size:2}]'
  },
  trigrams: {
    desc: 'return only the ngrams of size 3',
    returns: 'Text',
    example: 'nlp(\'we like Roy! we like Roy!\').ngrams().trigrams(0).data()\n//[{normal:\'we like roy\', count:2, size:3}]'
  },
  sort: {
    desc: 'the default sort for ngrams - count, then size, then character length. (called by default)',
    returns: 'Text',
    example: 'nlp(\'i scream, you scream, we all scream for icecream.\').ngrams().sort().first().out()\n//scream'
  }
};
