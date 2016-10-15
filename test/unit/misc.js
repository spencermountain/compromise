var test = require('tape');
var nlp = require('./lib/nlp');

var garbage = [
  '',
  '  ',
  null,
  '\n\n',
  [],
  {},
];
test('garbage:', function(t) {
  garbage.forEach(function (g, i) {
    var num = nlp(g).list.length;
    var msg = (typeof g) + ' text input #' + i;
    t.equal(num, 0, msg);
  });
  t.end();
});

test('misc:', function(t) {
  var m = nlp('2 million five hundred thousand and fifty nine is bigger than 2882').toNumber();
  t.equal(m.normal(), '2001559 is bigger than 2882');

  m = nlp('2 million five hundred thousand and fifty nine is bigger than 2882').toNiceNumber();
  t.equal(m.normal(), '2,001,559 is bigger than 2,882');

  // m = nlp('doug is 5 years old').toTextNumber();
  // t.equal(m.normal(), 'doug is five years old');



  t.end();
});
