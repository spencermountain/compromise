var test = require('tape');
var nlp = require('../lib/nlp');

test('people:', function(t) {
  let doc = nlp('Mary is in the boat. Nancy is in the boat. Fred is in the boat. Jack is too.');
  let arr = doc.people().out('array');
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

  t.end();
});
