var test = require('tape');
var nlp = require('../lib/nlp');

test('result methods', function(t) {
  var text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3';

  //has method
  var m = nlp(text);
  t.equal(m.match('#Emoji').found, true, 'nlp.has positive');
  t.equal(m.match('#SportsTeam').found, false, 'nlp.has neg');

  //filter string
  var small = m.if('#Emoji');
  t.equal(small.out('normal'), 'this :cookie: <3 💯 so good. yes it is <3', 'nlp.filter string');

  //filter method
  small = m.ifNo('#Emoji');
  t.equal(small.out('normal'), 'it is really nice.', 'nlp.filter method');

  t.end();
});
