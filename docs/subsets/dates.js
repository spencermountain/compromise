module.exports = {
  data: {
    desc: 'return an array of meta-data about the dates and times in this text',
    example: `nlp('').dates().data()
//[{text:''}]`,
    returns: 'array'
  },
  toShortForm: {
    desc: 'turn \'Thurs\' and \'Sept\' into `Thursday` and `September`',
    returns: 'Text',
    example: `nlp('April, June, and Sept').dates().toShortForm().all().out()
//Apr, Jun, and Sept`
  },
  toLongForm: {
    desc: 'turn `Thursday` and `September` into \'Thurs\' and \'Sept\'',
    returns: 'Text',
    example: `nlp('April, June, and Sept').dates().toShortForm().all().out()
//April, June, and September`
  },
};
