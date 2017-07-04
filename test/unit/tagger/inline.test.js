var test = require('tape');
var nlp = require('../lib/nlp');

test('inline tagging linear:', function(t) {
  var r = nlp('one two three four');

  r.match('one two three').tag('. #Person .');
  var found = r.match('#Person').out('normal');
  t.equal(found, 'two', 'skip-tag-skip');

  r.match('one two three').tag('#FooBar .');
  found = r.match('#FooBar').out('normal');
  t.equal(found, 'one', 'tag-skip-null');

  r.match('two three').tag('#Two #Three #Four');
  t.equal(r.match('#Two').out('normal'), 'two', 'two-is-two');
  t.equal(r.match('#Three').out('normal'), 'three', 'three-is-three');
  t.equal(r.match('#Four').out('normal'), '', 'four is ignored');

  t.end();
});
