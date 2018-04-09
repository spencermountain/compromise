var test = require('tape');
var nlp = require('../../lib/nlp');

test('sentence-to-gerund:', function(t) {
  [
    ['john walked', 'john is walking'],
    // ['i should win', 'i should be winning'],//support (some) modals?
    ['spencer will convert', 'spencer is converting'],
    ['everyone will see', 'everyone is seeing'],
    ['he is cool', 'he is being cool'],
    ['he was good', 'he is being good'],
    ['i am fun', 'i am being fun'],
    ['i am not fun', 'i am not being fun'],
    ['we will sing', 'we are singing'],
    ['we really will sing', 'we are really singing'],
  ].forEach(function(a) {
    var str = nlp(a[0]).sentences().toContinuous().out('normal');
    t.equal(str, a[1], str + ' -> ' + a[1]);
  });
  t.end();
});
