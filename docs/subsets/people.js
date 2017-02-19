module.exports = {
  data: {
    desc: 'return a handy array of meta-data of people mentioned in the text',
    example: `nlp('Nelson Muntz and Homer J. Simpson').people().data()
//[{text:'Nelson Muntz', pronoun:'he'}, {text:'Homer J. Simpson', pronoun:'he'}]`,
    returns: 'array'
  },
  pronoun: {
    desc: 'find the pronoun used to refer to the person, or suggest one based on their inferred gender.',
    returns: 'String',
    example: `nlp('Tony Hawk did a 900').people().pronoun()
//'he'`
  }
};
