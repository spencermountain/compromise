var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;



test('result methods', function (t) {
  let text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3';

  //has method
  let m = nlp(text)
  t.equal(m.has('#Emoji'), true, 'nlp.has positive')
  t.equal(m.has('#SportsTeam'), false, 'nlp.has neg')

  //filter string
  let small = m.filter('#Emoji')
  t.equal(small.normal(), 'this :cookie <3 💯 so good. yes it is <3', 'nlp.filter string')

  //filter method
  small = m.filter((ts) => {
    return !ts.has('#Emoji')
  })
  t.equal(small.normal(), 'it is really nice.', 'nlp.filter method')

  t.end();
});
