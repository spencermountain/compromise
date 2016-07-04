var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('lumper test:', function(t) {
  [
    ['John Baseball', ['Person']],
    ['John sr.', ['Person']],
    ['Dr. John', ['Person']],
    ['she said "dutch oven"', ['Person', 'PastTense', 'Quotation']],
    ['she said "huge dutch oven"', ['Person', 'PastTense', 'Quotation']],
    ['the Captain of Jamaica', ['Determiner', 'Noun']],
    ['joe will have walked', ['Person', 'Verb']],
    ['joe had walked', ['Person', 'Verb']],
  // ['joe had 5 books', ['Person', 'PastTense', 'Value']],
  // ['joe does walk', ['Person', 'PresentTense']],
  // ['joe doesn\'t walk', ['Person', 'PresentTense']],
  // ['joe does not walk', ['Person', 'PresentTense']],
  // ['joe does not walk quickly', ['Person', 'PresentTense', 'Adverb']],
  // ['joe does 5 books', ['Person', 'Verb', 'Value']],
  ].forEach(function (a) {
    var terms = nlp.sentence(a[0]).terms;
    pos_test(terms, a[1], t);
  });
  t.end();
});
