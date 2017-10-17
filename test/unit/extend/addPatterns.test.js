var test = require('tape');
var nlp = require('../lib/nlp');

test('addpatterns-test', function(t) {
  var patterns = {
    'master of #Noun': 'Person',
    'captain of the #Noun+': 'Person',
  };
  nlp.addPatterns(patterns);
  var doc = nlp('he is the master of ceremonies and captain of the Utah baseball team');
  var arr = doc.people().data();
  t.equal(arr.length, 2, 'found both');
  t.equal(arr[0].normal, 'master of ceremonies', 'first one');
  t.equal(arr[1].normal, 'captain of the utah baseball team', 'second-one');
  t.end();
});
