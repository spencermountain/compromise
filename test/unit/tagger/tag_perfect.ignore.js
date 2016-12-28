var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('=Tagger=', function(T) {

  T.test('pos-basic-tag:', function(t) {
    [
      ['John is pretty', ['Person', 'Copula', 'Adjective']],
      ['John was lofty', ['Person', 'Copula', 'Adjective']],
      ['John Smith was lofty', ['Person', 'Copula', 'Adjective']],
      ['asdfes was lofty', ['Noun', 'Copula', 'Adjective']],
      ['asdfes lksejfj was lofty', ['Noun', 'Copula', 'Adjective']],
      ['Spencer Kelly is in Canada', ['Person', 'Copula', 'Preposition', 'Place']],
      ['He is in Canada', ['Pronoun', 'Copula', 'Preposition', 'Place']],
      ['5 red roses', ['Value', 'Adjective', 'Noun']],
      // ['3 trains', ['Value', 'Noun']],
      // ['5 buses', ['Value', 'Noun']],
      //fancier stuff
      ['walk the walk', ['Verb', 'Determiner', 'Noun']],
      ['Peter the man', ['Person', 'Determiner', 'Noun']],
      ['book the flight', ['Verb', 'Determiner', 'Noun']],
      //slang, contractions
      ['u r nice', ['Pronoun', 'Copula', 'Adjective']],
      ['canadian bacon', ['Demonym', 'Noun']],
      ['canadian dollar', ['Currency']],
      //possessive rules
      ['bill lkjsdf\'s', ['Person']],
      ['bill lkjsdf\'s house', ['Person', 'Noun']],
      ['Bill Lkjsdf\'s house', ['Person', 'Noun']],
      ['Bill Lkjsdf\'s House', ['Person', 'Noun']],
      //question
      ['who is good?', ['Question', 'Copula', 'Adjective']],
      ['which is good?', ['Question', 'Copula', 'Adjective']],
      ['bacon which is good', ['Noun', 'Pronoun', 'Copula', 'Adjective']],
      ['bacon which really is good', ['Noun', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],
      ['Douglas who really is good', ['Person', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],
      //web text things
      ['lkj@fun.com', ['Email']],
      ['j@f.ti', ['Email']],
      ['j@ti', ['Noun']],
      ['@ti', ['AtMention']],
      ['#funtimes', ['HashTag']],
      ['http://fun.com/cool?fun=yes', ['Url']],
      ['#cool fun.com @cooman', ['HashTag', 'Url', 'AtMention']],
      //people
      ['John swim', ['Person', 'Verb']],
      ['John Swim', ['Person', 'Verb']],
      ['John, John', ['Person', 'Person']],
      ['John, you', ['Person', 'Pronoun']],
      ['John you', ['Person', 'Pronoun']],
      ['you John you', ['Pronoun', 'Person', 'Pronoun']],
      ['10 + 9', ['Value', 'Symbol', 'Value']],
      ['2 * 90 = 180', ['Value', 'Symbol', 'Value', 'Symbol', 'Value']],
      ['one - seventy-six', ['Value', 'Symbol', 'Value']],
    // ['',[]],
    // ['',[]],
    // ['',[]],
    ].forEach(function (a) {
      var terms = nlp.sentence(a[0]).terms;
      pos_test(terms, a[1], t);
    });
    t.end();
  });
});
