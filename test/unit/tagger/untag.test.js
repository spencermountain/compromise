var test = require('tape');
var nlp = require('../lib/nlp');

test('tag inference:', function(t) {
  var m = nlp('aasdf2').unTag('Noun').unTag('NounPhrase');
  var term = m.list[0].terms[0];
  t.equal(Object.keys(term.tags).length, 0, 'aasdf2 has no tags');
  //give it a specific tag-
  m.tag('SportsTeam');
  term = m.list[0].terms[0];
  t.equal(term.tags.Noun, true, 'aasdf2 now has Noun');
  t.equal(term.tags.Organization, true, 'aasdf2 now has Organization(inferred)');
  //give it a redundant tag-
  m.tag('Organization');
  term = m.list[0].terms[0];
  t.equal(term.tags.Noun, true, 'aasdf2 still has Noun');
  t.equal(term.tags.Organization, true, 'aasdf2 still has Organization');
  t.end();
});

test('untag inference:', function(t) {
  var m = nlp('aasdf');
  m.tag('FemaleName');
  var term = m.list[0].terms[0];
  t.equal(term.tags.FemaleName, true, 'aasdf first has FemaleName');
  t.equal(term.tags.Person, true, 'aasdf first has person');
  t.equal(term.tags.Noun, true, 'aasdf first has noun');
  //remove the assumption..
  term.unTag('Noun');
  t.equal(term.tags.Noun, undefined, 'aasdf now has no noun');
  t.equal(term.tags.Person, undefined, 'aasdf now has no person(inferred)');
  t.equal(term.tags.FemaleName, undefined, 'aasdf now has no FemaleName(inferred)');
  t.end();
});

test('tag idempodence:', function(t) {
  var m = nlp('walk').tag('Verb');
  var term = m.list[0].terms[0];
  t.equal(term.tags.Verb, true, 'walk has Verb');
  t.equal(term.tags.Value, undefined, 'walk has no Value');
  //untag irrelevant stuff
  term.unTag('Value');
  term.unTag('Determiner');
  term.unTag('Country');
  term.unTag('Place');
  t.equal(term.tags.Verb, true, 'walk has Verb after');
  t.equal(term.tags.Value, undefined, 'walk has no Value after');
  t.end();
});

test('tags are self-removing', function(t) {
  var terms = ['Person', 'Place', 'PastTense', 'FemaleName', 'Infinitive', 'HashTag', 'Month'];
  terms.forEach(function(tag) {
    var m = nlp('aasdf').tag(tag).unTag(tag);
    var t0 = m.list[0].terms[0];
    t.equal(t0.tags[tag], undefined, 'tag removes self ' + tag);
  });
  t.end();
});

test('untag wildcard', function(t) {
  var r = nlp('we live in Toronto Canada and it is cold');
  r.match('#Place+').unTag('*');
  t.equal(r.match('#Place').found, false, 'place-tag-is-gone');
  var term = r.list[0].terms[3];
  t.equal(Object.keys(term.tags).length, 0, 'toronto-has-no-tags-now');
  t.end();
});
