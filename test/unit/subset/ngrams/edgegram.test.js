var test = require('tape');
var nlp = require('../../lib/nlp');

test('edgegram-sizes:', function(t) {
  var r = nlp(`he is cool. john was cool. He is really nice.`);

  var arr = r.startGrams(null, 5).data();
  t.equal(arr.length, 0, 'no-overgrams');

  arr = r.startGrams(null, 4).data();
  t.equal(arr.length, 1, 'one-4-startgram');

  arr = r.endGrams(null, 4).data();
  t.equal(arr.length, 1, 'one-4-endgram');

  t.end();
});

test('start-sizes:', function(t) {
  var r = nlp(`he is cool. john was cool. He is really nice.`);
  var arr = r.startGrams().data();
  t.equal(arr[0].normal, 'he is', 'sorted-by-freq');
  t.equal(arr[0].count, 2, 'normalized-counted');
  t.equal(arr[0].size, 2, 'normalized-counted');
  t.end();
});
