'use strict';
const paths = require('../paths')
//turn just 'Noun', into something more

const wrestleNoun = function(t) {
  //turn 'Noun', into plural/singular
  if (!t.pos.Plural && !t.pos.Singular) {
    let inflection = 'Singular'
    if (t.info('isPlural')) {
      inflection = 'Plural'
    }
    t.tag(inflection, 'wrestle-pluralization')
  }
  return t
}

module.exports = wrestleNoun
