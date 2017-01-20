var test = require('tape');
var nlp = require('../lib/nlp');

test('verb-parts:', function(t) {

  var tests = [
    ['john is walking', '', 'is'],
    ['john was walking', '', 'was'],
    ['john will be walking', '', 'will be'],
    ['john has been walking', '', 'has been'],
    ['john had been walking', '', 'had been'],
    ['john would have had been walking', '', 'would have had been'],
    //negatives
    ['john is not walking', 'not', 'is'],
    ['john was not walking', 'not', 'was'],
    ['john will not be walking', 'not', 'will be'],
    ['john will be not walking', 'not', 'will be'],
    ['john has not been walking', 'not', 'has been'],
    ['john has been not walking', 'not', 'has been'],
    ['john had not been walking', 'not', 'had been'],
    ['john had been not walking', 'not', 'had been'],
    ['john would not have had been walking', 'not', 'would have had been'],
    ['john would have not had been walking', 'not', 'would have had been'],
    ['john would have had not been walking', 'not', 'would have had been'],
    ['john would have had been not walking', 'not', 'would have had been'],
  ];
  tests.forEach((a) => {
    var arr = nlp(a[0]).verbs().data();
    t.equal(arr.length, 1, '#verbs - ' + arr.length);
    t.equal(arr[0].parts.negative, a[1], 'neg-test - \'' + a[0] + '\'');
    t.equal(arr[0].parts.auxillary, a[2], 'aux-test  - \'' + a[0] + '\'');
    t.equal(arr[0].parts.verb, 'walking', 'verb-test  - \'' + a[0] + '\'');
  });

  t.end();
});
