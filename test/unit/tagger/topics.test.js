var test = require('tape');
var nlp = require('../lib/nlp');

test('proper-nouns', function(t) {
  let arr = [
    ['I met John Smith in Toronto.', ['john smith', 'toronto']],
    ['Toronto and Vancouver Canada.', ['toronto', 'vancouver canada']],
    ['we ate shellfish at 23 Main st.', []],
    ['google is suing motorola inc.', ['google', 'motorola inc']],
    ['the doctor and his brother see the mayor of france', ['france']],
  ];
  arr.forEach((a) => {
    let out = nlp(a[0]).match('#ProperNoun+').out('array');
    t.deepEqual(out, a[1], a[0]);
  });
  t.end();
});
