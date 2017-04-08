var test = require('tape');
var nlp = require('../../lib/nlp');

test('equalTo:', function (t) {
  let str = nlp('he is 7 years old').values().equalTo(7).out('normal');
  t.equal(str, '7', 'equalTo 7');

  str = nlp('he is seven years old').values().equalTo(7).out('normal');
  t.equal(str, 'seven', 'equalTo seven');

  str = nlp('it\'s his 7th birthday').values().equalTo(7).out('normal');
  t.equal(str, '7th', 'equalTo 7th');

  str = nlp('it\'s his seventh birthday').values().equalTo(7).out('normal');
  t.equal(str, 'seventh', 'equalTo seventh');

  str = nlp('i have 7 potatoes and 12 tomatoes').values().equalTo(7).out('normal');
  t.equal(str, '7', 'only 7');

  str = nlp('i have 9 potatoes and 77 tomatoes').values().equalTo(7).out('normal');
  t.equal(str, '', 'no equal-to');
  t.end();
});

test('greaterThan:', function (t) {
  let str = nlp('he is 8 years old').values().greaterThan(7).out('normal');
  t.equal(str, '8', '8 greaterThan 7');

  str = nlp('he is forty years old').values().greaterThan(7).out('normal');
  t.equal(str, 'forty', 'fourty greaterThan 7');

  str = nlp('my fifteenth years old').values().greaterThan(7).out('normal');
  t.equal(str, 'fifteenth', 'fifteenth greaterThan 7');
  t.end();
});
// nlp('seven peaches weigh ten kilograms').values().greaterThan(7).out('array')
// nlp('he is 7 years old').values().greaterThan('five').out('array')
