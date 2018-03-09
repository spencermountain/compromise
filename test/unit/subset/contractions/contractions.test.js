var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==contractions==', function(T) {
  T.test('possessives-or-contractions:', function(t) {
    [
      [`spencer's good`, `spencer is good`],
      [`spencer's house`, `spencer's house`],
      [`he's good`, `he is good`],
      [`spencer's really good`, `spencer is really good`],
      [`google's about to earn money`, `google is about to earn money`],
      [`they're mark's 'question marks'`, `they are mark's question marks`],

      [`toronto's citizens`, `toronto's citizens`],
      [`rocket's red glare`, `rocket's red glare`],
      [`everyone's victories`, `everyone's victories`],
      [`the tornado's power`, `the tornado's power`],

      [`somebody's walking`, `somebody is walking`],
      // [`spencer's walking`, `spencer was walking`], //ambiguous

      [`spencer's walked`, `spencer has walked`],
      [`spencer's had problems`, `spencer has had problems`],
      [`spencer's got potatoes`, `spencer has got potatoes`],
      [`spencer's gotten groceries`, `spencer has gotten groceries`],
      [`he's become fat`, `he has become fat`],
      [`she's earned money`, `she has earned money`],
      [`he's not ever milked a cow`, `he has not ever milked a cow`]
    ].forEach(function(a) {
      var m = nlp(a[0]);
      m.contractions().expand();
      var str = m.out('normal');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('contraction-pos:', function(t) {
    [
      [`john's good`, `Person`],
      [`ankara's good`, `Place`],
      [`January's good`, `Date`],
      [`john's cousin`, `Person`],
      [`ankara's citizens`, `Place`],
      [`January's weather`, `Date`]
    ].forEach(function(a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = term.text + ' has tag ' + a[1];
      t.equal(term.tags[a[1]], true, msg);
    });
    t.end();
  });

  T.test('expand:', function(t) {
    [
      [`he's a hero`, ['he', 'is']],
      [`she's here`, ['she', 'is']],
      [`it's a hero`, ['it', 'is']],
      [`he'd win`, ['he', 'would']],
      [`they'd win`, ['they', 'would']],
      [`they've begun`, ['they', 'have']],
      [`they'll begun`, ['they', 'will']],
      [`we've begun`, ['we', 'have']],
      [`don't go`, ['do', 'not']],
      // dont expand leading 'nt contraction
      [`mustn't go`, ['must', 'not']],
      [`haven't gone`, ['have', 'not']],
      [`isn't going`, ['is', 'not']],
      ['can\'t go', ['can', 'not']],
      ['ain\'t going', ['is', 'not']],
      ['won\'t go', ['will', 'not']],

      ['i\'d go', ['i', 'would']],
      ['she\'d go', ['she', 'would']],
      ['he\'d go', ['he', 'would']],
      ['they\'d go', ['they', 'would']],
      ['we\'d go', ['we', 'would']],

      ['i\'ll go', ['i', 'will']],
      ['she\'ll go', ['she', 'will']],
      ['he\'ll go', ['he', 'will']],
      ['they\'ll go', ['they', 'will']],
      ['we\'ll go', ['we', 'will']],

      ['i\'ve go', ['i', 'have']],
      ['they\'ve go', ['they', 'have']],
      ['we\'ve go', ['we', 'have']],
      ['should\'ve go', ['should', 'have']],
      ['would\'ve go', ['would', 'have']],
      ['could\'ve go', ['could', 'have']],
      ['must\'ve go', ['must', 'have']],

      ['i\'m going', ['i', 'am']],
      ['we\'re going', ['we', 'are']],
      ['they\'re going', ['they', 'are']],

      [`don't`, ['do', 'not']],
      [`do not`, ['do', 'not']],
      [`dunno`, ['do', 'not', 'know']],

      [`spencer's going`, ['spencer', 'is']],
      [`he's going`, ['he', 'is']],

      [`how'd`, ['how', 'did']],
      // [`why'd`, ['why', 'did']],
      // [`who'd`, ['who', 'did']],
      [`when'll`, ['when', 'will']],
      [`how'll`, ['how', 'will']],
      [`who'll`, ['who', 'will']],
      [`who's`, ['who', 'is']],
      [`how's`, ['how', 'is']]
    ].forEach(function(a) {
      var arr = nlp(a[0]).contractions().expand().out('terms');
      var got = arr.map(function(term) {
        return term.normal;
      });
      var msg = a[0] + '  - - [' + got.join(', ') + '] should be [' + a[1].join(', ') + ']';
      t.deepEqual(got, a[1], msg);
    });
    t.end();
  });
  //
  T.test('contract:', function(t) {
    [
      [`he is a hero`, `he's`],
      [`she is here`, `she's`],
      [`it is a hero`, `it's`],
      [`he would win`, `he'd`],
      [`they would win`, `they'd`],
      [`they have begun`, `they've`],
      [`how will`, `how'll`],
      [`when will`, `when'll`],
      [`who did`, `who'd`],
      [`who is`, `who's`]
    ].forEach(function(a) {
      var term = nlp(a[0]).contractions().contract().list[0].terms[0];
      str_test(term.normal, a[0], a[1], t);
    });
    t.end();
  });

  T.test('preserve-contractions:', function(t) {
    [`he is a hero`, `she is here`, `it is a hero`, `he would win`, `they would win`].forEach(function(a) {
      var str = nlp(a[0]).out('normal');
      str_test(str, a[0], a[0], t);
    });
    t.end();
  });

  T.test('reverse-is-consistent:', function(t) {
    var str = `doesn't there's i'd i'll can't won't wasn't weren't wouldn't haven't`;
    var doc = nlp(str);
    doc.contractions().expand();
    doc.contractions().contract();
    doc.contractions().expand();
    doc.contractions().contract();
    t.equal(doc.out(), str, 'idempodent expand/contract');
    t.end();
  });

  T.test('contraction-supports-whitespace:', function(t) {
    [
      ['We\'ve only just begun', 'We have only just begun'],
      ['We\'ve   only just begun', 'We have   only just begun']
    ].forEach(function(a) {
      var m = nlp(a[0]);
      m.contractions().expand();
      var str = m.out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('numberRange-contraction:', function(t) {
    var r = nlp('june 5-7 1998').match('5 to 7');
    t.equal(r.out('normal'), '5-7', 'june 5-7 numberRange');

    r = nlp('rooms 99-102').match('99 to 102');
    t.equal(r.out('normal'), '99-102', 'rooms 99-102');

    r = nlp('around 7.5-8').match('7.5 to 8');
    t.equal(r.out('normal'), '7.5-8', 'around 7.5-8');

    r = nlp('june 5th-7th 1998').match('5th to 7th');
    t.equal(r.out('normal'), '5th-7th', 'june 5th-7th numberRange');

    r = nlp('june 5th - 7th 1998').match('5th to 7th');
    t.equal(r.out('text'), ' 5th - 7th', 'june 5th - 7th numberRange');

    t.end();
  });

  T.test('numberRange-expand:', function(t) {
    var r = nlp('june 5-7 1998');
    r.contractions().expand();
    var str = r.out('normal');
    t.equal(str, 'june 5 to 7 1998', 'june 5-7 numberRange');

    r = nlp('rooms 99-102');
    r.contractions().expand();
    str = r.out('normal');
    t.equal(str, 'rooms 99 to 102', 'rooms 99-102');

    r = nlp('june 5th-7th 1998');
    r.contractions().expand();
    str = r.out('normal');
    t.equal(str, 'june 5th to 7th 1998', 'june 5th-7th numberRange');

    r = nlp('june 5th - 7th 1998');
    r.contractions().expand();
    str = r.out('normal');
    t.equal(str, 'june 5th to 7th 1998', 'june 5th - 7th numberRange');

    var doc = nlp('measuring 7.5–11 micrometers');
    doc.contractions().expand();
    doc.values().toNice();
    t.equal('measuring 7.5 to 11 micrometers', doc.out(), 'numer-range-emdash');
    doc.values().toText();
    t.equal('measuring seven point five to eleven micrometers', doc.out(), 'numer-range-emdash2');

    t.end();
  });

  T.test('not-a-numberRange:', function(t) {
    var doc = nlp('twenty-two');
    t.equal(doc.has('#NumberRange'), false, 'twenty-two not numberRange');
    t.end();
  });
});
