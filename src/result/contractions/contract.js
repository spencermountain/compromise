'use strict';

//the plumbing to turn two words into a contraction
const combine = (a, b) => {
  b.whitespace.after = a.whitespace.after;
  a.whitespace.after = '';
  b.whitespace.before = '';
  a.silent_term = a.text;
  b.silent_term = b.text;
  b.text = '';
  a.tagAs('Contraction', 'new-contraction');
  b.tagAs('Contraction', 'new-contraction');
};

const contract = function(r) {
  //he is -> he's
  r.match('#Noun is').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'s';
  });
  //he would -> he'd
  r.match('#Noun would').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'d';
  });
  //they are -> they're
  r.match('(they|we) are').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'re';
  });
  //they will -> they'll
  r.match('(they|we) will').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'ll';
  });
  //they have -> they've
  r.match('(they|we) have').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'ve';
  });
  //i am -> i'm
  r.match('i am').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'m';
  });
  //is not -> isn't
  r.match('(is|are|#Modal) not').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += 'n\'t';
  });
  return r;
};

module.exports = contract;
