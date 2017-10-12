var test = require('tape');
var nlp = require('../lib/nlp');

test('addpatterns-test', function(t) {
  let patterns = {
    'master of #Noun': 'Person',
    'captain of the #Noun+': 'Person',
  };
  nlp.addPatterns(patterns);
  let doc = nlp('he is the master of ceremonies and captain of the Utah baseball team');
  let arr = doc.people().data();
  t.equal(arr.length, 2, 'found both');
  t.equal(arr[0].normal, 'master of ceremonies', 'first one');
  t.equal(arr[1].normal, 'captain of the utah baseball team', 'second-one');
  t.end();
});
