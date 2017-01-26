var test = require('tape');
var nlp = require('../lib/nlp');

test('verb-to-negative:', function(t) {
  [
    [`he is nice`, 'is not'],
    [`she was nice`, 'was not'],

    [`she has walked`, 'has not walked'],
    [`she had walked`, 'had not walked'],
    [`we have had problems`, 'have not had'],
    [`we would walk`, 'would not walk'],
    [`we would have walked`, 'would not have walked'],

    //conjugations
    // [`she walked`, 'did not walk'],
    // [`it all came apart`, 'did not come apart'],

    //phrasals
    [`he would come forward`, 'would not come forward'],
    [`we come together`, 'did not come together'],

    [`he was frightened back`, 'not frightened back'],
    [`i didn't want to frighten away the kids`, 'didn\'t want'],
  ].forEach(function (a) {
    var vb = nlp(a[0]).verbs().toNegative()
    var str=vb.out('normal')
    t.equal(str, a[1], a[0]+'  -  '+str);
  });
  t.end();
});
