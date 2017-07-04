var test = require('tape');
var nlp = require('../../lib/nlp');

test('bestTag', function(t) {
  var str = 'john smith was really working';
  var m = nlp(str);
  var have = m.terms().data().map(function(o) {
    return o.bestTag;
  });
  var want = ['MaleName', 'LastName', 'Copula', 'Adverb', 'Gerund'];
  var msg = str + ' - [' + have.join(', ') + ']';
  t.deepEqual(have, want, msg);

  str = 'he sang on June 5th 1991';
  m = nlp(str);
  have = m.terms().data().map(function(o) {
    return o.bestTag;
  });
  want = ['Pronoun', 'PastTense', 'Preposition', 'Month', 'Ordinal', 'Year'];
  msg = str + ' - [' + have.join(', ') + ']';
  t.deepEqual(have, want, msg);

  str = 'fastest shooter in Canada';
  m = nlp(str);
  have = m.terms().data().map(function(o) {
    return o.bestTag;
  });
  want = ['Superlative', 'Noun', 'Preposition', 'Country'];
  msg = str + ' - [' + have.join(', ') + ']';
  t.deepEqual(have, want, msg);

  t.end();
});
