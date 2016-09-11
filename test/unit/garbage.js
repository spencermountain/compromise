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

test('==Garbage tests==', function(T) {

  T.test('text() garbage:', function(t) {
    garbage.forEach(function (g) {
      var num = nlp(g).list.length;
      var msg = (typeof g) + 'text input';
      t.equal(num, 0, msg);
    });
    t.end();
  });

});
