var test = require('tape');
var nlp = require('../lib/nlp');

test('proper-nouns', function(t) {
  var arr = [
    ['I met John Smith in Toronto.', ['john smith', 'toronto']],
    ['Toronto and Vancouver Canada.', ['toronto', 'vancouver canada']],
    ['we ate shellfish at 23 Main st.', []],
    ['google is suing motorola inc.', ['google', 'motorola inc']],
    ['the doctor and his brother see the mayor of france', ['france']],
  ];
  arr.forEach((a) => {
    var out = nlp(a[0]).match('#ProperNoun+').out('array');
    t.deepEqual(out, a[1], a[0]);
  });
  t.end();
});

//after we change pos, untag propernoun
test('remove-proper-nouns', function(t) {
  var doc = nlp('do what Theresa May');
  t.equal(doc.match('may').has('#ProperNoun'), true, 'propernoun-init');
  doc.match('may').tag('Verb');
  t.equal(doc.match('may').has('#ProperNoun'), false, 'propernoun-missing');
  t.end();
});
