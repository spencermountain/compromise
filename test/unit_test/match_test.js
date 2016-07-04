var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('==Match ==', function(T) {

  T.test('term-match :', function(t) {
    [
      ['quick', 'quick', true],
      ['Quick', 'Quick', true],
      ['quick', 's', false],
      ['quick', '[Adjective]', true],
      ['quick', '[Noun]', false],
      ['quick', '(fun|nice|quick|cool)', true],
      ['quick', '(fun|nice|good)', false],
    ].forEach(function(a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' matches ' + a[1] + ' ' + a[2];
      t.equal(term.match(a[1]), a[2], msg);
    });
    t.end();
  });

  T.test('sentence-match:', function(t) {
    [
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog played', 'the dog played'],
      ['the dog played', 'the [Noun]', 'the dog'],
      ['the dog played', 'the [Noun] played', 'the dog played'],
      ['the dog played', 'the cat played', ''],
      ['the dog played', 'the [Adjective] played', ''],
      ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
      ['the dog played', 'the (cat|piano) played', ''],
      ['the dog played', 'the . played', 'the dog played'],
      //optional
      ['the dog played', 'the dog quickly? played', 'the dog played'],
      ['the dog played', 'the dog [Adverb]? played', 'the dog played'],
      ['the dog quickly played', 'the dog [Adverb]? played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog [Adverb] played', 'the dog quickly played'],
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
      [`if you don't mind`, `you don't mind`, `you don't mind`],
      [`if you don't mind`, `you don't care`, ``],
      [`if you don't mind`, `you don't`, `you don't`],
      [`if you don't mind`, `don't mind`, `don't mind`],
      [`if you didn't care`, `didn't`, `didn't`],
      // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

      [`don't go`, `do not`, `don't`],
      [`do not go`, `do not`, `do not`],
      [`i dunno`, `do not`, `dunno`],
      //bugs
      [`really remind me to buy`, '[Adverb]? [Infinitive] (me|us) (to|for)', `really remind me to`],

    ].forEach(function(a) {
      var matches = nlp.sentence(a[0]).match(a[1]);
      if (!matches) {
        t.equal(a[2], '', 'no-match: ' + a[0]);
      } else {
        str_test(matches[0].text(), a[0], a[2], t);
      }
    });
    t.end();
  });

});
