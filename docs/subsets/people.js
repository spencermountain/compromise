'use strict';
module.exports = {
  data: {
    desc: 'return a handy array of meta-data of people mentioned in the text',
    example: 'nlp(\'The bong-rattling bass of Mel Schacher? The competent drum work of Don Brewer?\').people().data()\n//[{text:\' Mel Schacher\'}, {text:\'Don Brewer\'}]',
    returns: 'array'
  },
  pronoun: {
    desc: 'find the pronoun used to refer to the person, or suggest one based on their inferred gender.',
    returns: 'String',
    example: 'nlp(\'Tony Hawk did a 900\').people().pronoun()\n//\'he\''
  }
};
