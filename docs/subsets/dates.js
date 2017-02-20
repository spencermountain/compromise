'use strict';
module.exports = {
  data: {
    desc: 'return an array of meta-data about the dates and times in this text',
    example: 'nlp(\'Finally, I just stopped caring. Luckily for me, it was 1980 and no one noticed.\').dates().data()\n//[{text:\'1980\'}]',
    returns: 'array'
  },
  toShortForm: {
    desc: 'turn \'Thurs\' and \'Sept\' into `Thursday` and `September`',
    returns: 'Text',
    example: 'nlp(\'April, June, and Sept\').dates().toShortForm().all().out()\n//Apr, Jun, and Sept'
  },
  toLongForm: {
    desc: 'turn `Thursday` and `September` into \'Thurs\' and \'Sept\'',
    returns: 'Text',
    example: 'nlp(\'April, June, and Sept\').dates().toShortForm().all().out()\n//April, June, and September'
  }
};
