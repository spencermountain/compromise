var test = require('tape');
var nlp = require('./lib/nlp');

var garbage = [
  '',
  '  ',
  null,
  '\n\n',
  [],
  {},
];
test('garbage:', function(t) {
  garbage.forEach(function (g, i) {
    var num = nlp(g).list.length;
    var msg = (typeof g) + ' text input #' + i;
    t.equal(num, 0, msg);
  });
  t.end();
});

test('misc:', function(t) {
  var m = nlp('2 million five hundred thousand and fifty nine is bigger than 2882').values().toNumber();
  t.equal(m.normal(), '2001559 is bigger than 2882');

  m = nlp('2 million five hundred thousand and fifty nine is bigger than 2882').values().toNiceNumber();
  t.equal(m.plaintext(), '2,001,559 is bigger than 2,882');

  m = nlp('doug is 5 years old').values().toTextValue();
  t.equal(m.normal(), 'doug is five years old');

  m = nlp('i\'d buy those nachos').nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy that nacho');

  m = nlp('i\'d buy these nachos').nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy this nacho');

  m = nlp('i\'d buy nachos').nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy a nacho');

  m = nlp('i\'d buy the nachos').nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy a nacho');
  m = nlp('i\'d buy the eggs').nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy an egg');

  m = nlp('men go').verbs().toPast().nouns().toSingular();
  t.equal(m.normal(), 'a man went');
  t.end();
});
