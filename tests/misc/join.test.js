var test = require('tape');
var nlp = require('../lib/nlp');

test('linked-list joins', function(t) {
  let doc = nlp(`one two three four.`);
  let two = doc.match('two');
  two.append('and a');
  t.equal(two.normal(), 'two and a', 'self has new terms');
  // console.log(doc.out('array'));

  // t.equal(true, true, 'msg');
  t.end();
});
