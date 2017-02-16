module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().dates().data()`,
    returns: 'array'
  },
  toShortForm: {
    desc: 'turn \'Thurs\' and \'Sept\' into `Thursday` and `September`',
    returns: 'Text',
    example: `nlp('April, June, and Sept').dates().toShortForm().all().out()\n//Apr, Jun, and Sept`
  },
  toLongForm: {
    desc: 'turn `Thursday` and `September` into \'Thurs\' and \'Sept\'',
    returns: 'Text',
    example: `nlp('April, June, and Sept').dates().toShortForm().all().out()\n//April, June, and September`
  },
};
