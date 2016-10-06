var test = require('tape');
var nlp = require('./lib/nlp');

test('pos-from-lexicon', function(t) {
  var arr = [
    ['toronto', 'City'],
    ['mexico', 'Country'],
    ['Jamaica', 'Country'],
    ['legendary', 'Adjective'],
    ['above', 'Adjective'],
    ['moderate', 'Adjective'],
    ['extreme', 'Adjective'],
    ['august', 'Month'],
    ['saturday', 'Day'],
    ['minute', 'Duration'],
    ['valentines day', 'Holiday'],
    ['ash wednesday', 'Holiday'],
    ['really', 'Adverb'],
    ['each', 'Determiner'],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  ];
  arr.forEach(function (a) {
    var term = nlp(a[0]).list[0].terms[0];
    var msg = '\'' + term.normal + '\' has - ' + a[1];
    t.equal(term.tag[a[1]], true, msg);
  });
  t.end();
});
