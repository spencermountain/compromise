var test = require('tape');
var nlp = require('../lib/nlp');

test('encoding-match:', function(t) {

  var r = nlp('it is * nice');
  var str = r.match('is \\*').trim().out();
  t.equal(str, 'is *', 'encode asterix');

  // r = nlp('it is + nice');
  // str = r.match('is \\+ nice').trim().out();
  // t.equal(str, 'is + nice', 'encode plus');

  t.end();
});
