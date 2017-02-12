module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().people().data()`,
    returns: 'array'
  },
  pronoun: {
    desc: 'find the pronoun used to refer to the person, or suggest one based on their inferred gender.',
    returns: 'String',
    example: `nlp('Tony Hawk did a 900').people().pronoun() //'he'`
  }
};
