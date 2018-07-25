var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('sentence():', function(t) {
  [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
    ['he is good', 'he is good'],
    ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    ['Joe', 'joe'],
    ['just-right', 'just right'],
    ['camel', 'camel'],
    ['4', '4'],
    ['four', 'four'],
    ['john smith', 'john smith'],
    ['Dr. John Smith-McDonald', 'dr john smith mcdonald'],
    ['Contains no fruit juice. \n\n All rights reserved', 'contains no fruit juice. all rights reserved']
  ].forEach(function(a) {
    var str = nlp(a[0]).out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('normalize():', function(t) {
  [
    [' so... you like DONUTS? have all the donuts in the WORLD!!!', 'so you like donuts? have all the donuts in the world!'],
    ['This is a test. .', 'this is a test.'],
    ['Björk, the singer-songwriter...', 'bjork the singer songwriter'],
    ['the so-called “fascist  dictator”', 'the so called "fascist dictator"'],
    // ['the so-called ❛singer-songwriter❜', 'the so called \'singer songwriter\''],
    // ['the so-called ❛group of seven❜', 'the so called \'group of 7\''],
    ['Director of the F.B.I.', 'director of the fbi'],
  ].forEach(function(a) {
    var str = nlp(a[0]).normalize().out('text');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('possessives', function(t) {
  var doc = nlp(`Corey Hart's pudding and Google's advertising`);
  doc = doc.normalize({
    possessives: true,
    case: false
  });
  t.equal(doc.out(), 'Corey Hart pudding and Google advertising', 'normalize possessives');
  t.end();
});

test('optional params', function(t) {
  var doc = nlp(`John Smith bought automobiles (for us)`).normalize({
    case: true,
    possessives: true,
    parentheses: true,
    // plurals: true,
    verbs: true,
  });
  t.equal(doc.out(), 'john smith buy automobiles', 'many-on');
  t.end();
});

test('honorifics', function(t) {
  var tests = [
    ['rear admiral Smith', 'smith'],
    ['Lieutenant John Smith', 'john smith'],
    // ['Admiral Davis Jr', 'davis jr'],
    ['Field marshal Herring', 'herring'],
    ['General Lou Gobbells of the US air force', 'lou gobbells of the us air force'],
    ['Rear admiral John', 'john'],
    ['Lieutenant general James Baker', 'james baker'],
    ['Lieutenant colonel Bing Crosby', 'bing crosby'],
    ['Major Tom', 'tom'],
    ['major effort by President Xi', 'major effort by xi'],
    ['Corporal John Herring', 'john herring'],
    ['sergeant major Harold', 'harold'],
    ['Second lieutenant Semore Hirthman', 'semore hirthman'],
    ['first lady Michelle obama', 'michelle obama'],
    ['prime minister Stephen Hawking', 'stephen hawking'],
  //no names
  // ['first lieutenant', '1st lieutenant'],
  // ['Sergeant', 'sergeant'],
  ];
  tests.forEach((a) => {
    var doc = nlp(a[0]);
    doc = doc.normalize({
      honorifics: true,
      case: true
    });
    t.equal(doc.out('normal'), a[1], a[0]);
  });
  t.end();
});

test('elipses-whitespace:', function(t) {
  var doc = nlp('about this ...').normalize();
  t.equal(doc.out('text'), 'about this', 'normalize seperate elipses');

  doc = nlp('about this ...').toLowerCase();
  t.equal(doc.out('text'), 'about this ...', 'lowercase elipses');

  doc = nlp('about this...').normalize();
  t.equal(doc.out('text'), 'about this', 'normalize attatched elipses');
  t.end();
});

test('more-normalize:', function(t) {
  var doc = nlp(`i saw first lady michelle obama`);
  doc.normalize({
    honorifics: true
  });
  t.equal(doc.out('text'), 'i saw michelle obama', 'normalize honorifics');

  doc = nlp(`google's tax return`);
  doc.normalize({
    possessives: true
  });
  t.equal(doc.out('text'), 'google tax return', 'normalize possessives');
  t.end();
});
