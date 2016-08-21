var test = require('tape');
var nlp = require('./lib/nlp');


test('fancy match', function(t) {
  [
    //misc
    ['doug is good', '', 0],
    ['doug is good', '.', 1],
    ['doug is good', '.?', 1],

    //contractions
    ['he\'s nice', 'he is', 2],
    ['he\'s nice', 'is nice', 2],
    ['he\'s nice', 'he\'s', 1],
    ['he\'s nice', 'he\'s nice', 3],

    //over/under
    ['he is nice', 'is nice and good', 0],
    ['is nice', 'he is nice', 0],

    //dot
    ['doug is good', 'doug is good', 3],
    ['doug is good', 'doug . good', 3],
    ['doug is good', 'doug is .', 3],
    ['doug is good', '. is .', 3],
    ['doug is good', '. . .', 3],
    ['doug is good', '. . . .', 0],

    //optional miss
    ['doug is good', 'doug is really? good', 3],
    ['doug is good', 'doug is .? good', 3], //tricky 'greedy optional' bug
    ['doug is good', 'doug is [Adverb]? good', 3],
    //optional has
    ['doug is really good', 'doug is really? good', 4],
    ['doug is really good', 'doug is .? good', 4],
    ['doug is really good', 'doug is [Adverb]? good', 4],

  ].forEach(function (a) {
    var r = nlp(a[0]).match(a[1]).first() || [];
    var msg = '\'' + a[0] + '\' - - - \'' + a[1] + '\' - - got:' + r.length + '  want:' + a[2];
    t.equal(r.length, a[2], msg);
  });
  t.end();
});
