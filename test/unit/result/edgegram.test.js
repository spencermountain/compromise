var test = require('tape');
var nlp = require('../lib/nlp');

test('edgegram-sizes:', function (t) {
  var r = nlp(`he is cool. john was cool. He is really nice.`);

  var arr = r.out('startgram', 5);
  t.equal(arr.length, 0, 'no-overgrams');

  arr = r.out('startgram', 4);
  t.equal(arr.length, 1, 'one-4-startgram');

  arr = r.out('endgram', [4]);
  t.equal(arr.length, 1, 'one-4-endgram');

  var opts = {
    size: [4]
  };
  arr = r.out('edgegram', opts);
  t.equal(arr.length, 1, 'one-4-endgram-size');

  arr = r.out('edgegram', 0);
  t.equal(arr.length, 0, 'no-0-gram');

  t.end();
});

test('edgegram-sizes:', function (t) {
  var r = nlp(`he is cool. john was cool. He is really nice.`);
  var arr = r.out('edgegram', 2);
  t.equal(arr[0].text, 'he is', 'sorted-by-freq');
  t.equal(arr[0].count, 2, 'normalized-counted');
  t.equal(arr[0].size, 2, 'normalized-counted');
  t.end();
});
