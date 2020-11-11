const test = require('tape')
const nlp = require('./_lib')

test('fractions:', function(t) {
  let arr = nlp('1/2').values().json();
  t.equal(arr[0].number, 0.5);

  arr = nlp('1 1/2').values().json();
  t.equal(arr[0].number, 1.5);
  t.equal(arr.length, 1);

  arr = nlp('1/2 1').values().json();
  t.equal(arr[0].number, 0.5);
  t.equal(arr.length, 2);

  t.end();
})