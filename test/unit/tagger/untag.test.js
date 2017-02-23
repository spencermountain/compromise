var test = require('tape');
var nlp = require('../lib/nlp');

test('tag inference:', function (t) {
  var m = nlp('aasdf2').unTag('Noun').unTag('NounPhrase');
  var term = m.list[0].terms[0];
  t.equal(Object.keys(term.tag).length, 0, 'aasdf2 has no tags');
  //give it a specific tag-
  m.tag('SportsTeam');
  term = m.list[0].terms[0];
  t.equal(term.tag.Noun, true, 'aasdf2 now has Noun');
  t.equal(term.tag.Organization, true, 'aasdf2 now has Organization(inferred)');
  //give it a redundant tag-
  m.tag('Organization');
  term = m.list[0].terms[0];
  t.equal(term.tag.Noun, true, 'aasdf2 still has Noun');
  t.equal(term.tag.Organization, true, 'aasdf2 still has Organization');
  t.end();
});

test('untag inference:', function (t) {
  var m = nlp('aasdf');
  m.tag('FemaleName');
  var term = m.list[0].terms[0];
  t.equal(term.tag.FemaleName, true, 'aasdf first has FemaleName');
  t.equal(term.tag.Person, true, 'aasdf first has person');
  t.equal(term.tag.Noun, true, 'aasdf first has noun');
  //remove the assumption..
  term.unTag('Noun');
  t.equal(term.tag.Noun, undefined, 'aasdf now has no noun');
  t.equal(term.tag.Person, undefined, 'aasdf now has no person(inferred)');
  t.equal(term.tag.FemaleName, undefined, 'aasdf now has no FemaleName(inferred)');
  t.end();
});

test('tag idempodence:', function (t) {
  var m = nlp('walk').tag('Verb');
  var term = m.list[0].terms[0];
  t.equal(term.tag.Verb, true, 'walk has Verb');
  t.equal(term.tag.Value, undefined, 'walk has no Value');
  //untag irrelevant stuff
  term.unTag('Value');
  term.unTag('Determiner');
  term.unTag('Country');
  term.unTag('Place');
  t.equal(term.tag.Verb, true, 'walk has Verb after');
  t.equal(term.tag.Value, undefined, 'walk has no Value after');
  t.end();
});

test('tags are self-removing', function (t) {
  var terms = [
    'Person',
    'Place',
    'PastTense',
    'FemaleName',
    'Infinitive',
    'HashTag',
    'Month',
  ];
  terms.forEach(function(tag) {
    m = nlp('aasdf').tag(tag).unTag(tag);
    var t0 = m.list[0].terms[0];
    t.equal(t0.tag[tag], undefined, 'tag removes self ' + tag);
  });
  t.end();
});
