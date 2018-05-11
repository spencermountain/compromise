var test = require('tape');
var nlp = require('../../lib/nlp');

test('.toPossessive():', function(t) {
  [
    ['duck', `duck's`],
    ['eavesdropper', `eavesdropper's`],
    ['John', `John's`],
    ['hour', `hour's`],
    ['F.B.I', `F.B.I's`],
    ['John Smith', `John Smith's`],
    ['skateboards', `skateboards'`],
    ['Flanders', `Flanders'`],
    // ['she', 'hers'],
    ['peaches', `peaches'`]
  ].forEach(function(a) {
    var doc = nlp(a[0]).tag('Noun').nouns().toPossessive();
    t.equal(doc.out(), a[1], a[0]);
  });
  t.end();
});
