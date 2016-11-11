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
  var str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  var m = nlp(str).values().toNumber();
  t.equal(m.normal(), '2001559 is bigger than 2882', str);

  str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  m = nlp(str).values().toNiceNumber();
  t.equal(m.plaintext(), '2,001,559 is bigger than 2,882', str);

  str = 'doug is 5 years old';
  m = nlp(str).values().toTextValue();
  t.equal(m.normal(), 'doug is five years old', str);

  str = 'i\'d buy those nachos';
  m = nlp(str).nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy that nacho', str);

  str = 'i\'d buy these nachos';
  m = nlp(str).nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy this nacho', str);

  str = 'i\'d buy nachos';
  m = nlp(str).nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy a nacho', str);

  str = 'i\'d buy the nachos';
  m = nlp(str).nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy a nacho', str);

  str = 'i\'d buy the eggs';
  m = nlp(str).nouns().toSingular();
  t.equal(m.normal(), 'i\'d buy an egg', str);

  str = 'men go';
  m = nlp(str).verbs().toPast().nouns().toSingular();
  t.equal(m.normal(), 'a man went', str);
  t.end();
});
