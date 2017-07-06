var test = require('tape');
var nlp = require('../../lib/nlp');

test('to-numOrdinal:', function(t) {
  var arr = [
    'one',
    '1',
    '1.0', //not sure..
    '1st',
    'first'
  ];
  arr.forEach(txt => {
    var o = nlp(txt).values().data()[0] || {};
    t.equal(o.ordinal, '1st', txt + ' -> 1st');
  });
  arr = ['500', '500.0', '500th', 'five hundred', 'five hundredth'];
  arr.forEach(txt => {
    var o = nlp(txt).values().data()[0] || {};
    t.equal(o.ordinal, '500th', txt + ' -> 500th');
  });
  arr = ['2012', '2012.0', '2,012', '2012th', 'two thousand and twelve', 'two thousand and twelfth'];
  arr.forEach(txt => {
    var o = nlp(txt).values().data()[0] || {};
    t.equal(o.ordinal, '2012th', txt + ' -> 2012th');
  });
  t.end();
});

test('to-textOrdinal:', function(t) {
  var arr = [
    'one',
    '1',
    '1.0', //not sure..
    '1st',
    'first'
  ];
  arr.forEach(txt => {
    var o = nlp(txt).values().data()[0] || {};
    t.equal(o.textOrdinal, 'first', txt + ' -> first');
  });
  arr = ['500', '500.0', '500th', 'five hundred', 'five hundredth'];
  arr.forEach(txt => {
    var o = nlp(txt).values().data()[0] || {};
    t.equal(o.textOrdinal, 'five hundredth', txt + ' -> five hundredth');
  });
  arr = ['2012', '2012.0', '2,012', '2012th', 'two thousand and twelve', 'two thousand and twelfth'];
  arr.forEach(txt => {
    var o = nlp(txt).values().data()[0] || {};
    t.equal(o.textOrdinal, 'two thousand and twelfth', txt + ' -> two thousand and twelfth');
  });
  t.end();
});
