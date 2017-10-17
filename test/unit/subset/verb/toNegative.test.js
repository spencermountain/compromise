var test = require('tape');
var nlp = require('../../lib/nlp');

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
    [`she walked`, 'did not walk'],
    [`it all came apart`, 'all did not come apart'],

    //phrasals
    [`he would come forward`, 'would not come forward'],
    [`we come together`, 'do not come together'],
    [`he was frightened`, 'was not'],
    [`i didn't want to`, 'didn\'t want'],

    //===singular
    // pastTense -
    ['john played', 'did not play'],
    // presentTense -
    ['john plays', 'does not play'],
    // futureTense -
    ['john will play', 'will not play'],

    ///===plural
    // pastTense -
    ['we played', 'did not play'],
    // presentTense -
    ['we play', 'do not play'],
    // futureTense -
    ['we will play', 'will not play']
  ].forEach(function(a) {
    var vb = nlp(a[0]).verbs().toNegative();
    var str = vb.out('normal');
    t.equal(str, a[1], '\'' + str + '\' - - want: ' + a[1]);
  });
  t.end();
});
