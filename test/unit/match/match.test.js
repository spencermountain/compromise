var test = require('tape');
var nlp = require('../lib/nlp');

test('==Match ==', function(T) {
  T.test('term-match :', function(t) {
    [
      ['quick', 'quick', true],
      ['Quick', 'Quick', true],
      ['quick', 's', false],
      ['quick', '#Adjective', true],
      ['quick', '#Noun', false],
      ['quick', '(fun|nice|quick|cool)', true],
      ['quick', '(fun|nice|good)', false]
    ].forEach(function(a) {
      var m = nlp(a[0]).match(a[1]);
      var msg = a[0] + ' matches ' + a[1] + ' ' + a[2];
      t.equal(m.found, a[2], msg);
    });
    t.end();
  });

  T.test('sentence-match:', function(t) {
    [
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog played', 'the dog played'],
      ['the dog played', 'the #Noun', 'the dog'],
      ['the dog played', 'the #Noun played', 'the dog played'],
      ['the dog played', 'the cat played', ''],
      ['the dog played', 'the #Adjective played', ''],
      ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
      ['the dog played', 'the (cat|piano) played', ''],
      ['the dog played', 'the . played', 'the dog played'],
      //optional
      ['the dog played', 'the dog quickly? played', 'the dog played'],
      ['the dog played', 'the dog #Adverb? played', 'the dog played'],
      ['the dog quickly played', 'the dog #Adverb? played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog #Adverb played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog . played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog .? played', 'the dog quickly played'],
      // ['the dog played', 'the dog .? played', 'the dog played'],

      //leading/trailing logic
      ['the dog played', 'the dog played$', 'the dog played'],
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog$', ''],
      ['the dog played', 'the dog$ played', ''],
      ['the dog played', '^the dog', 'the dog'],
      ['the dog played', 'dog played', 'dog played'],
      ['the dog played', '^dog played', ''],
      ['the dog played', '^played', ''],
      ['the dog played', '^the', 'the'],

      ['john eats glue', 'john eats glue', 'john eats glue'],
      ['john eats glue', 'john eats', 'john eats'],
      ['john eats glue', 'eats glue', 'eats glue'],
      ['john eats glue', 'eats glue all day', ''],

      //test contractions
      // [`if you don't mind`, `you don't mind`, `you don't mind`],
      [`if you don't mind`, `you don't care`, ``],
      // [`if you don't mind`, `you don't`, `you don't`],
      // [`if you don't mind`, `don't mind`, `don't mind`],
      [`if you didn't care`, `didn't`, `didn't`],
      // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

      // [`don't go`, `do not`, `don't`],
      [`do not go`, `do not`, `do not`]
      // [`i dunno`, `do not`, `dunno`],
      //bugs
      // [`really remind me to buy`, '#Adverb? #Infinitive (me|us) (to|for)', `really remind me to`],
    ].forEach(function(a) {
      var m = nlp(a[0]).match(a[1]);
      if (!m.found) {
        t.equal(a[2], '', 'no-match: ' + a[0] + ' - -' + a[1]);
      } else {
        var msg = "'" + a[0] + "'  - " + a[1] + " - - have : '" + m.out('normal') + "'";
        t.equal(m.out('normal'), a[2], msg);
      }
    });
    t.end();
  });

  test('match-from-array :', function(t) {
    var m = nlp('spencer is really cool').match(['spencer']);
    t.equal(m.out('normal'), 'spencer', 'just-spencer');
    t.equal(m.length, 1, 'one-result');

    m = nlp('spencer is really cool').match([]);
    t.equal(m.out('normal'), '', 'empty match');
    t.equal(m.length, 0, 'zero-results');

    m = nlp('spencer is really cool');
    var r = m.match(['spencer', 'really']).toUpperCase();
    t.equal(r.out('text'), 'SPENCER REALLY', 'match-spencer-really');
    t.equal(r.length, 2, 'two-results');

    t.equal(m.out('text'), 'SPENCER is REALLY cool', 'match-spencer-really');
    t.equal(m.length, 1, 'still-one-result');
    t.end();
  });

  test('match-from-object :', function(t) {
    var m = nlp('spencer is really cool').match({
      spencer: true
    });
    t.equal(m.out('normal'), 'spencer', 'just-spencer');
    t.equal(m.length, 1, 'one-result');
    t.end();
  });

  test('tag-match-tag :', function(t) {
    var m = nlp('apple is cool');
    m.match(['apple', 'susan']).tag('Person');
    var p = m.people();
    t.equal(p.out('normal'), 'apple', 'apple-tagged');
    t.equal(m.length, 1, 'one-result');
    t.end();
  });

  test('lump-match:', function(t) {
    var m = nlp('hello one two three hello');
    m.match('one two three').lump();

    t.equal(m.has('hello'), true, 'has-unlumped');
    t.equal(m.has('one two three'), true, 'has-lumped');
    t.equal(m.has('hello one two three'), true, 'word+lumped');
    t.equal(m.has('one two three hello'), true, 'lumped+word');

    t.equal(m.has('one'), false, 'no-partial1');
    t.equal(m.has('two'), false, 'no-partial2');
    t.equal(m.has('three'), false, 'no-partial3');
    t.equal(m.has('one two'), false, 'no-partial4');
    t.equal(m.has('two three'), false, 'no-partial5');
    t.equal(m.has('hello one two'), false, 'no-partial6');
    t.equal(m.has('three hello'), false, 'no-partial7');
    t.equal(m.has('two three hello'), false, 'no-partial8');
    t.end();
  });

  test('before-match:', function(t) {
    var r = nlp('one two three four five').before('two');
    t.equal(r.out('normal'), 'one', 'before-two');

    r = nlp('one two three four five').before('three . five');
    t.equal(r.out('normal'), 'one two', 'before-several');

    r = nlp('one two three four five').before('one two');
    t.equal(r.out('normal'), '', 'no-before-start');

    // r = nlp('one two three four').before('.'); //tricky
    // t.equal(r.out('normal'), '', 'before-any');

    r = nlp('one two three four. No, not here. He said two days a week.').before('two');
    var arr = r.out('array');
    t.equal(arr[0], 'one', 'before-twice-1');
    t.equal(arr[1], 'he said', 'before-twice-2');

    r = nlp('it was all the way over to two. It was the number two.').before('it');
    t.equal(r.found, false, 'no-empty-matches');

    t.end();
  });

  test('after-match:', function(t) {
    var r = nlp('one two three four five').after('two');
    t.equal(r.out('normal'), 'three four five', 'after-one');

    r = nlp('one two three four five').after('one . three');
    t.equal(r.out('normal'), 'four five', 'after-several');

    r = nlp('one two three four five').after('four five');
    t.equal(r.out('normal'), '', 'no-afters-end');

    r = nlp('one two three four').after('.');
    t.equal(r.out('normal'), 'two three four', 'after-any');

    r = nlp('one two three four. No, not here. He said two days a week.').after('two');
    var arr = r.out('array');
    t.equal(arr[0], 'three four', 'after-twice-1');
    t.equal(arr[1], 'days a week', 'after-twice-2');

    r = nlp('all the way over to two. It was the number two.').after('two');
    t.equal(r.found, false, 'no-empty-matches');

    t.end();
  });
});
