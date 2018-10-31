var test = require('tape');
var nlp = require('../lib/nlp');

test('append parent', function(t) {
  let doc = nlp(`one two three`);
  doc.append('four five');
  t.equal(doc.text(), 'one two three four five', 'appended in parent');
  t.end();
});

test('append one child', function(t) {
  let doc = nlp(`one two three`);
  let m = doc.match('three');
  m.append('four five');
  t.equal(doc.text(), 'one two three four five', 'appended in parent');
  t.end();
});

test('append two children', function(t) {
  let doc = nlp(`one two three`);
  let m = doc.match('two three');
  let m2 = m.match('three');
  m2.append('four five');
  t.equal(m.normal(), 'two three four five', 'append in child 1');
  t.equal(m2.normal(), 'three four five', 'append in child 2');
  t.equal(doc.text(), 'one two three four five', 'appended in parent');
  t.end();
});

test('append in middle', function(t) {
  let doc = nlp(`one two three six`);
  let m = doc.match('three').append('four five');
  t.equal(m.normal(), 'three four five', 'append in child 1');
  t.equal(doc.text(), 'one two three four five six', 'inserted in parent');
  t.end();
});

test('append in middle many children', function(t) {
  let doc = nlp(`one two three six`);
  let mx = doc.match('one two three').match('three').match('.').match('three');
  mx.append('four five');
  t.equal(mx.normal(), 'three four five', 'append in child n');
  t.equal(doc.text(), 'one two three four five six', 'inserted in parent');
  t.end();
});
