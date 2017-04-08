var test = require('tape');
var nlp = require('../../lib/nlp');

test('parse-value-basic:', function (t) {
  let num = nlp('1st').values().numbers()[0];
  t.equal(num, 1, '1st');
  num = nlp('1').values().numbers()[0];
  t.equal(num, 1, '1');
  num = nlp('first').values().numbers()[0];
  t.equal(num, 1, 'first');
  num = nlp('one').values().numbers()[0];
  t.equal(num, 1, 'one');
  //long-numbers
  num = nlp('55575').values().numbers()[0];
  t.equal(num, 55575, '55575');
  num = nlp('55,575').values().numbers()[0];
  t.equal(num, 55575, '55,575');
  num = nlp('55,575.279').values().numbers()[0];
  t.equal(num, 55575.279, '55,575.279');
  num = nlp('$55,575').values().numbers()[0];
  t.equal(num, 55575, '$55,575');
  //decimals
  num = nlp('2.5').values().numbers()[0];
  t.equal(num, 2.5, '2.5');
  num = nlp('2.5th').values().numbers()[0];
  t.equal(num, 2.5, '2.5th');
  //two-terms
  num = nlp('fifty seven').values().numbers()[0];
  t.equal(num, 57, 'fifty seven');
  num = nlp('fifty 7').values().numbers()[0];
  t.equal(num, 57, 'fifty 7');
  num = nlp('2 hundred').values().numbers()[0];
  t.equal(num, 200, '2 hundred');
  num = nlp('2 hundredth').values().numbers()[0];
  t.equal(num, 200, '2 hundredth');

  t.end();
});
