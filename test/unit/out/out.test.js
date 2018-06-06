var test = require('tape');
var nlp = require('../lib/nlp');

test('topk:', function(t) {
  var str = 'it is good. it was nice. she is cool.';
  var r = nlp(str);
  var arr = r.verbs().out('topk');
  t.equal(arr[0].normal, 'is', '#1 is');
  t.equal(arr[0].count, 2, 'two is count');

  t.equal(arr[1].normal, 'was', 'one was count');
  t.equal(arr[1].count, 1, 'one was count');

  arr = nlp('we\'re cool. they are fun').terms().out('freq');
  t.equal(arr[0].normal, 'are', 'contraction- are');
  t.equal(arr[0].count, 2, 'are combined');

  t.end();
});

test('out-tags:', function(t) {
  var str = 'texas rangers are a baseball team';
  var r = nlp(str);
  var arr = r.out('tags');
  t.equal(arr.length, 6, '6 terms');
  t.equal(arr[0].normal, 'texas', 'texas #1');
  t.equal(arr[1].normal, 'rangers', 'rangers #2');
  t.equal(arr[2].normal, 'are', 'are #2');
  t.ok(arr[0].tags.indexOf('SportsTeam') !== -1, 'they are a sportsteam');
  t.end();
});

test('out-array:', function(t) {
  var str = 'texas rangers are a baseball team. They do not play in houston.';
  var r = nlp(str).verbs();
  var arr = r.out('array');
  t.equal(arr.length, 2, '2 verbs');
  t.equal(arr[0], 'are', 'are #1');
  t.equal(arr[1], 'do not play', 'do not play #2');
  t.end();
});

test('out-csv:', function(t) {
  var str = 'John, Jill McGraw, and Moe were swimming';
  var have = nlp(str).people().out('csv');
  var want = 'john\njill,mcgraw\nmoe';
  t.equal(have, want, str + ' -> ' + have);
  t.end();
});

test('out-newlines:', function(t) {
  var str = 'John, Jill McGraw, and Moe were swimming';
  var have = nlp(str).people().out('newlines');
  var want = 'John,\nJill McGraw,\nMoe';
  t.equal(have, want, want + ' -> ' + have);
  t.end();
});

test('out-custom:', function(t) {
  var doc = nlp('The competent drum work of Don Brewer?').debug();
  var arr = doc.out({
    text: true,
    normal: false,
    tags: true,
    sdf: true,
    root: true
  });
  arr = arr[0];
  t.equal(arr[0].text, 'The', 'has text');
  t.equal(arr[5].root, 'don', 'has root');
  t.equal(arr[5].sdf, undefined, 'has no sdf');
  t.equal(arr[0].tags.Determiner, true, 'has tags');
  t.end();
});

test('out-others:', function(t) {
  var str = 'texas rangers are a baseball team. They do not play in houston.';
  var r = nlp(str).verbs();
  var txt = r.out('text');
  t.notEqual(r.out('html'), txt, 'html-out');
  t.notEqual(r.out('grid'), txt, 'grid-out');
  t.notEqual(r.out('root'), txt, 'grid-out');
  t.notEqual(r.out('color'), txt, 'color-out');
  t.notEqual(r.out('tags'), txt, 'tags-out');
  t.end();
});
