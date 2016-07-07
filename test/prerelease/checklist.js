var test = require('tape');

var checklist = function(nlp, desc) {
  test(desc, function(t) {
    //basic pos-tagging
    var terms = nlp.text('john is good', {}).sentences[0].terms;
    t.equal(terms[0].pos.Person, true, 'john is Person -' + desc);
    t.equal(terms[1].pos.Verb, true, 'is - Verb -' + desc);
    t.equal(terms[2].pos.Adjective, true, 'good is Adjective -' + desc);
    t.end();
  });
};
module.exports = checklist;
