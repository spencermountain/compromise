var test = require('tape');
var nlp = require('../lib/nlp');

test('js-loop-map', function(t) {
  var text = 'oh hello. please turn on the lights and then take out the garbage too. After that, play some music.';
  var doc = nlp(text);
  var arr = doc.map(m => {
    return m.terms(0).out('normal');
  });
  t.equal(arr.length, 3, 'right-size');
  t.equal(arr[0], 'oh', 'oh-first');
  t.equal(arr[1], 'please', 'please-first');
  t.equal(arr[2], 'after', 'after-first');
  t.end();
});

test('js-loop-reduce', function(t) {
  var text = 'oh hello. please turn on the lights and then take out the garbage too. After that, play some music.';
  var doc = nlp(text);
  var list = doc.reduce((arr, m) => {
    arr.push(m.terms(0).out('normal'));
    return arr;
  }, []);
  t.equal(list.length, 3, 'right-size');
  t.equal(list[0], 'oh', 'oh-first');
  t.equal(list[1], 'please', 'please-first');
  t.equal(list[2], 'after', 'after-first');

  var txt = doc.reduce((str, m) => {
    str += m.terms(0).out('normal');
    return str;
  }, '');
  t.equal(txt, 'ohpleaseafter', 'reduce-to-a-string');
  t.end();
});

test('js-loop-filter', function(t) {
  var text = 'oh hello. please turn on the lights and then take out the garbage too. After that, play some music.';
  var doc = nlp(text);
  t.equal(doc.list.length, 3, 'before-filter');
  var doc2 = doc.filter(m => {
    return m.terms().out('array').length > 2;
  });
  t.equal(doc.list.length, 3, 'same-after-filter');
  t.equal(doc2.list.length, 2, 'new array smaller');
  t.end();
});

test('js-loop-forEach', function(t) {
  var text = 'oh hello. please turn on the lights and then take out the garbage too. After that, play some music.';
  var doc = nlp(text);
  var arr = [];
  doc.forEach(m => {
    arr.push(m.firstTerm().out('normal'));
  });
  t.equal(arr.length, 3, 'right-size');
  t.equal(arr[0], 'oh', 'oh-first');
  t.equal(arr[1], 'please', 'please-first');
  t.equal(arr[2], 'after', 'after-first');
  t.end();
});

test('js-loop-find', function(t) {
  var text = 'oh hello. please turn on the lights and then take out the garbage too. After that, play some music.';
  var doc = nlp(text);
  t.equal(doc.list.length, 3, 'before-filter');
  var doc2 = doc.find(m => {
    return m.terms(0).out('normal') === 'after';
  });
  t.equal(doc.list.length, 3, 'same-after-filter');
  t.equal(doc2.list.length, 1, 'found one');
  t.equal(doc2.out(), 'After that, play some music.', 'found the right one');

  var doc3 = doc.find(m => {
    return m.terms(0).out('normal') === 'missing term';
  });
  t.equal(doc3, undefined, 'missing value returns undefined');
  t.end();
});
