var test = require('tape');
var nlp = require('../lib/nlp');

test('fancy match', function(t) {
  [
    //misc
    ['doug is good', '', 0],
    ['doug is good', '.', 3],
    ['doug is good', '.?', 3],
    ['doug is good', '.+', 3],

    //contractions
    ['he\'s nice', 'he is', 2],
    ['he\'s nice', 'is nice', 2],
    ['he\'s nice', 'he\'s', 1],
    ['he\'s nice', 'he\'s nice', 3],
    ['he\'s nice', 'nice', 1],

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
    ['doug is good', 'doug is #Adverb? good', 3],
    //optional has
    ['doug is really good', 'doug is really? good', 4],
    ['doug is really good', 'doug is .? good', 4],
    ['doug is really good', 'doug is #Adverb? good', 4],
    //asterix empty
    ['doug is good', 'doug *', 3],
    ['doug is good', 'doug is *', 3],
    ['doug is good', '*', 3],
    //asterix positive
    ['doug is good', 'doug * good', 3],
    ['doug is really good', 'doug * good', 4],
    ['doug is really so very good', 'doug * good', 6],
    ['doug is really so very good at stuff', 'doug * good', 6],
    ['we think doug is really so very good at stuff', 'doug * good', 6],
    //asterix negative
    ['doug is good', 'doug * bad', 0],
    ['doug is good', 'spencer * bad', 0],
    ['doug is good', 'spencer *', 0],
    ['doug is good', 'doug * is', 2], //another tricky 'greedy optional' bug
    ['cool, fun, great, nice', '#Adjective+ great', 3],

    //
    ['Dr. Spencer Smith says hi', 'dr', 1],
    ['Dr. Spencer Smith says hi', 'dr spencer', 2],
    ['Dr. Spencer Smith says hi', 'dr spencer smith', 3],
    ['Dr. Spencer Smith says hi', 'dr spencer smith says', 4],
    ['Lately, Dr. Spencer Smith says hi', 'lately dr spencer smith', 4],
    //start ^
    ['in toronto', '^toronto', 0],
    ['toronto', '^toronto', 1],
    ['in toronto', '^in toronto', 2],
    ['in toronto', 'in ^toronto', 0],
    //end $
    ['it snows', 'it snows', 2],
    ['it snows', 'snows$', 1],
    ['it snows', 'it snows$', 2],
    ['it snows', 'it$ snows', 0],
    ['it snows', 'foo$', 0],
    //negative !
    ['it really snows', 'it #adverb snows', 3],
    ['it really snows', 'it !#adverb snows', 0],
    ['it really snows. it goes.', 'it !#adverb', 2],
    ['it is nice.', '!#adverb', 3],
    //max/min {}
    ['if it goes really well', 'if .{1,2} well', 0],
    ['if it goes really well', 'if .{1,6} well', 5],
    ['so i said that spencer is nice', '^.{1,3} spencer', 0],
    ['so i said that spencer is nice', '^.{1,6} spencer', 5],
    ['one two three four five', 'one two{1,2}', 2],
    ['one two three four five', 'one two{1,3}', 2],
    ['one two three four five', 'one two{0,3}', 2],
    ['one two three four five', 'one .{0,3} two', 2],
    ['one two three four five', 'one .{0,3} three', 3],
    ['one two three four five', 'one .{1,3} two', 0],
    ['one two three four five six seven', 'one .{0,4} six seven', 7],
    //optional/consecutive
    ['is really walking', 'is #Adverb+? walking', 3],
    ['is walking', 'is #Adverb+? walking', 2],
    ['is really really walking', 'is #Adverb+? walking', 4],
    ['is really not walking', 'is (#Adverb|not)+? walking', 4],
    ['is really not quickly walking', 'is (#Adverb|not)+? walking', 5],
    ['is walking', 'is (#Adverb|not)+? walking', 2],
    ['Phoenix AZ', '#City #Region', 2],
    //this isn't working
    ['the canadian senate', 'the (united states|canadian) senate', 3],
    ['the canadian senate', '(canadian|united states|british)', 1],
  ].forEach(function(a) {
    var r = nlp(a[0]).match(a[1]).terms() || [];
    var msg = '\'' + a[0] + '\' - - - \'' + a[1] + '\' - - got:' + r.length + '  want:' + a[2];
    t.equal(r.length, a[2], msg);
  });
  t.end();
});

test('tricky-case', function(t) {
  t.equal(nlp('Number II').has('Number II'), true, 'uppercase-match');
  t.equal(nlp('Number I').has('Number I'), true, 'uppercase-match');
  t.end();
});

test('text-as-input', function(t) {
  var doc = nlp('he is from Phoenix AZ');
  var m = doc.match('#City');
  var matchWith = doc.match(m).out('normal');
  var without = doc.not(m).out('text');
  t.equal(matchWith, 'phoenix', 'text-as-match');
  t.equal(without, 'he is from AZ', 'text-as-not');
  t.end();
});
