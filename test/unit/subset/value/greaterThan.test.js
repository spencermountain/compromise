var test = require('tape');
var nlp = require('../../lib/nlp');

test('equalTo:', function (t) {
  let str = nlp('he is 7 years old').values().equalTo(7).out('normal');
  t.equal(str, '7', 'equalTo');

  str = nlp('he is seven years old').values().equalTo(7).out('normal');
  t.equal(str, '7', 'equalTo');

  str = nlp('it\'s his 7th birthday').values().equalTo(7).out('normal');
  t.equal(str, '7th', 'equalTo');

  str = nlp('it\'s his seventh birthday').values().equalTo(7).out('normal');
  t.equal(str, 'seventh', 'equalTo');
  t.end();
});

// nlp('seven peaches weigh ten kilograms').values().greaterThan(7).out('array')
// nlp('he is 7 years old').values().greaterThan('five').out('array')
