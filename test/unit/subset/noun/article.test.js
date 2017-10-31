var test = require('tape');
var nlp = require('../../lib/nlp');

test('.article():', function(t) {
  [
    ['duck', 'a'],
    ['eavesdropper', 'an'],
    ['alligator', 'an'],
    // ['hour', 'an'],
    ['NDA', 'an'],
    ['F.B.I', 'an'],
    ['N.D.A.', 'an'],
    ['eulogy', 'a'],
    ['ukalele', 'a'],
    ['skateboards', 'the'],
    ['John Smith', ''],
    ['Tony Danza', '']
  ].forEach(function(a) {
    var o = nlp(a[0]).tag('Noun').nouns().data()[0];
    var msg = a[0] + ' -> ' + o.article;
    t.equal(o.article, a[1], msg);
  });
  t.end();
});
