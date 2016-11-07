
var test = require('tape');
var nlp = require('./lib/nlp');

test('tag/untag:', function(t) {
  m = nlp('aasdf').tag('Person');
  var term = m.list[0].terms[0];
  t.equal(term.tag.Person, true, 'tag has person');
  t.equal(term.tag.Noun, true, 'tag has noun');
  term.unTag('Noun');
  t.equal(term.tag.Noun, undefined, 'tag has no noun');
  t.equal(term.tag.Person, true, 'tag still has person');
  var terms = [
    'Person',
    'Place',
    'PastTense',
    'FemalePerson',
    'Infinitive',
    'HashTag',
    'Month',
  ];
  terms.forEach((tag) => {
    m = nlp('aasdf').tag(tag).unTag(tag);
    var t0 = m.list[0].terms[0];
    t.equal(t0.tag[tag], undefined, 'tag removes self ' + tag);
  });
  t.end();
});
