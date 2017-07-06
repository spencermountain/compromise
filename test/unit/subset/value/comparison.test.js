var test = require('tape');
var nlp = require('../../lib/nlp');

test('isEqual:', function(t) {
  var str = nlp('he is 7 years old').values().isEqual(7).out('normal');
  t.equal(str, '7 years old', 'isEqual 7');

  str = nlp('he is seven years old').values().isEqual(7).out('normal');
  t.equal(str, 'seven years old', 'isEqual seven');

  str = nlp("it's his 7th birthday").values().isEqual(7).out('normal');
  t.equal(str, '7th birthday', 'isEqual 7th');

  str = nlp("it's his seventh birthday").values().isEqual(7).out('normal');
  t.equal(str, 'seventh birthday', 'isEqual seventh');

  str = nlp('i have 7 potatoes and 12 tomatoes').values().isEqual(7).out('normal');
  t.equal(str, '7 potatoes', 'only 7');

  str = nlp('i have 17 potatoes and fourteen tomatoes').values().isEqual('seventeen').out('normal');
  t.equal(str, '17 potatoes', 'only 17');

  str = nlp('i have 15 books and eight hundred tomatoes').values().isEqual('fifteenth').out('normal');
  t.equal(str, '15 books', 'only 15');

  str = nlp('i have 152 potatoes and eight hundred and two tomatoes').values().isEqual('152nd').out('normal');
  t.equal(str, '152 potatoes', 'only 152');

  str = nlp('i have 9 potatoes and 77 tomatoes').values().isEqual(7).out('normal');
  t.equal(str, '', 'no equal-to');
  t.end();
});

test('greaterThan:', function(t) {
  var str = nlp('he is 8 years old').values().greaterThan(7).out('normal');
  t.equal(str, '8 years old', '8 greaterThan 7');

  str = nlp('he is forty years old').values().greaterThan(7).out('normal');
  t.equal(str, 'forty years old', 'fourty greaterThan 7');

  str = nlp('fifteen donuts').values().greaterThan(7).out('normal');
  t.equal(str, 'fifteen donuts', 'fifteen greaterThan 7');

  str = nlp('my fifteenth donut').values().greaterThan(7).out('normal');
  t.equal(str, 'fifteenth donut', 'fifteenth greaterThan 7');

  str = nlp('i have 9 potatoes and 77 tomatoes').values().greaterThan(700).out('normal');
  t.equal(str, '', 'no greaterThan');

  t.end();
});

test('lessThan:', function(t) {
  var str = nlp('he is 8 years old').values().lessThan(700).out('normal');
  t.equal(str, '8 years old', '8 lessThan 700');

  str = nlp('he is forty years old').values().lessThan('forty-one').out('normal');
  t.equal(str, 'forty years old', 'fourty lessThan forty-one');

  str = nlp('my fifteenth book').values().lessThan(70).out('normal');
  t.equal(str, 'fifteenth book', 'fifteenth lessThan 70');

  str = nlp('i have 9 potatoes and 77 tomatoes').values().lessThan(9).out('normal');
  t.equal(str, '', 'no lessThan');

  t.end();
});

test('negative comparisons:', function(t) {
  var str = nlp('i am 8 years old').values().greaterThan(-2).out('normal');
  t.equal(str, '8 years old', '8 greaterThan -2');

  str = nlp('i am eighty years old').values().greaterThan('-200').out('normal');
  t.equal(str, 'eighty years old', 'eighty greaterThan -200');

  str = nlp('it is minus seven degrees out').values().lessThan('seven').out('normal');
  t.equal(str, 'minus seven degrees', 'minus seven lessThan seven');

  str = nlp('i am minus two years old').values().isEqual('-2').out('normal');
  t.equal(str, 'minus two years old', 'minus two isEqual -2');

  str = nlp('i am -2 years old').values().isEqual(-2).out('normal');
  t.equal(str, '-2 years old', '-2 isEqual -2');

  t.end();
});
