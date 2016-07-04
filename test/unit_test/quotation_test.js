var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

var all_quotations = function(s) {
  var str = '';
  for(var i = 0; i < s.terms.length; i++) {
    if (s.terms[i].pos.Quotation) {
      str += ' ' + s.terms[i].normal;
    }
  }
  return str.trim();
};

test('quotation test:', function(t) {
  [
    [`he is "really good"`, `really good`],
    [`he is "really good" i guess`, `really good`],
    [`he is "good" i guess`, `good`],
    [`he is "completely and utterly great" i guess`, `completely and utterly great`],
    [`“quote”`, `quote`],
    [`“quote is here”`, `quote is here`],
  ].forEach(function (a) {
    var str = all_quotations(nlp.sentence(a[0]));
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
