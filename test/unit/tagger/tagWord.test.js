var test = require('tape');
var nlp = require('../lib/nlp');

//test a word from each file in ./data/**
test('pos from-lexicon', function(t) {
  var arr = [
    ['toronto', 'City'],
    ['mexico', 'Country'],
    ['Jamaica', 'Country'],
    ['legendary', 'Adjective'],
    ['above', 'Adjective'],
    ['moderate', 'Adjective'],
    ['extreme', 'Adjective'],
    ['august', 'Month'],
    ['saturday', 'WeekDay'],
    ['minute', 'Duration'],
    ['valentines day', 'Holiday'],
    ['ash wednesday', 'Holiday'],
    ['really', 'Adverb'],
    ['each', 'Determiner'],
    ['voila', 'Expression'],
    ['new england', 'Place'],
    ['hers', 'Possessive'],
    ['onto', 'Preposition'],
    ['blvd', 'Place'],
    ['belgian', 'Demonym'],
    ['cactus', 'Singular'],
    ['cacti', 'Plural'],
    ['economy', 'Noun'],
    ['engineer', 'Noun'],
    ['clothing', 'Noun'],
    ['duran duran', 'Organization'],
    ['american express', 'Organization'],
    ['brotherhood', 'Noun'],
    ['oakland athletics', 'SportsTeam'],
    ['jamie', 'Person'],
    ['claire', 'FemaleName'],
    ['arthur', 'MaleName'],
    ['¥', 'Currency'],
    ['pence', 'Currency'],
    ['seven', 'Value'],
    ['seventeen', 'Value'],
    ['twenty', 'Value'],
    ['thousand', 'Value'],
    ['eighteenth', 'Value'],
    ['tbsp', 'Unit'],
    ['wrote', 'PastTense'],
    ['write', 'Verb'],
    ['survive', 'Verb'],
    ['attempt', 'Verb'],
    ['mc\'adams', 'LastName'],
    ['Müller', 'LastName'],
    ['muller', 'LastName'],
    ['425-1231', 'PhoneNumber'],
    ['823-425-1231', 'PhoneNumber'],
    ['823 425-1231', 'PhoneNumber'],
    ['(823) 425-1231', 'PhoneNumber'],
    ['invest', 'Verb'],
    ['investing', 'Verb'],
    [`wallys'`, 'Possessive'],
    [`JDI University'`, 'Organization'],
    ['ocean', 'Noun'],
    ['shiver', 'Verb']
  ];
  arr.forEach(function(a) {
    var term = nlp(a[0]).list[0].terms[0];
    var msg = '\'' + term.normal + '\' has - ' + a[1] + '  (' + Object.keys(term.tags).join(',') + ')';
    t.equal(term.tags[a[1]], true, msg);
  });
  t.end();
});
