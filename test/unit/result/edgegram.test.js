var test = require('tape');
var nlp = require('../lib/nlp');

test('edgegram:', function (t) {
  const r = nlp(`he is cool. john was cool. He is really nice.`);
  console.log(r.out('startgram', 4));

  t.equal(m.normal(), 'spencer is here.', 'if-partial');

  t.end();
});
