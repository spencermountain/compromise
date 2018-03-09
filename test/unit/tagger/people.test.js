var test = require('tape');
var nlp = require('../lib/nlp');

test('people:', function(t) {
  var doc = nlp('Mary is in the boat. Nancy is in the boat. Fred is in the boat. Jack is too.');
  var arr = doc.people().out('array');
  t.deepEqual(arr, ['mary', 'nancy', 'fred', 'jack'], 'people-easy');

  doc = nlp('jean jacket. jean Slkje');
  arr = doc.people().out('array');
  t.deepEqual(arr, ['jean slkje'], 'people-context');

  doc = nlp('The Bill was passed by James MacCarthur');
  arr = doc.people().out('array');
  t.deepEqual(arr, ['james maccarthur'], 'the-bill');

  doc = nlp('Rod MacDonald bought a Rod');
  arr = doc.people().out('array');
  t.deepEqual(arr, ['rod macdonald',], 'the-rod-1');

  doc = nlp('Rod L. MacDonald bought a lightening rod');
  arr = doc.people().out('array');
  t.deepEqual(arr, ['rod l macdonald',], 'the-rod-2');

  doc = nlp('Matt \'the doctor\' Smith lasted three seasons.');
  arr = doc.people().out('array');
  t.deepEqual(arr, ['matt the doctor smith',], 'nickname-1');

  doc = nlp('Randal Kieth Orton and Dwayne \'the rock\' Johnson had a really funny fight.');
  arr = doc.people().out('array');
  t.deepEqual(arr, ['randal kieth orton','dwayne the rock johnson',], 'nickname-2');

  t.end();
});
