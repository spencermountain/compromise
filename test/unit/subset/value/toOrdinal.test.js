var test = require('tape');
var nlp = require('../../lib/nlp');

test('to-numOrdinal:', function (t) {
  let arr = [
    'one',
    '1',
    '1.0', //not sure..
    '1st',
    'first',
  ];
  arr.forEach((txt) => {
    let str = nlp(txt).values().data()[0].ordinal;
    t.equal(str, '1st', txt + ' -> 1st');
  });
  arr = [
    '500',
    '500.0',
    '500th',
    'five hundred',
    'five hundredth',
  ];
  arr.forEach((txt) => {
    let str = nlp(txt).values().data()[0].ordinal;
    t.equal(str, '500th', txt + ' -> 500th');
  });
  arr = [
    '2012',
    '2012.0',
    '2,012',
    '2012th',
    'two thousand and twelve',
    'two thousand and twelfth',
  ];
  arr.forEach((txt) => {
    let str = nlp(txt).values().data()[0].ordinal;
    t.equal(str, '2012th', txt + ' -> 2012th');
  });
  t.end();
});

test('to-textOrdinal:', function (t) {
  let arr = [
    'one',
    '1',
    '1.0', //not sure..
    '1st',
    'first',
  ];
  arr.forEach((txt) => {
    let str = nlp(txt).values().data()[0].textOrdinal;
    t.equal(str, 'first', txt + ' -> first');
  });
  arr = [
    '500',
    '500.0',
    '500th',
    'five hundred',
    'five hundredth',
  ];
  arr.forEach((txt) => {
    let str = nlp(txt).values().data()[0].textOrdinal;
    t.equal(str, 'five hundredth', txt + ' -> five hundredth');
  });
  arr = [
    '2012',
    '2012.0',
    '2,012',
    '2012th',
    'two thousand and twelve',
    'two thousand and twelfth',
  ];
  arr.forEach((txt) => {
    let str = nlp(txt).values().data()[0].textOrdinal;
    t.equal(str, 'two thousand and twelfth', txt + ' -> two thousand and twelfth');
  });
  t.end();
});
