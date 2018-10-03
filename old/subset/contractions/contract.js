'use strict';

//the plumbing to turn two words into a contraction
const combine = (a, b) => {
  b.whitespace.after = a.whitespace.after;
  a.whitespace.after = '';
  b.whitespace.before = '';
  a.silent_term = a.text;
  b.silent_term = b.text;
  b.text = '';
  a.tag('Contraction', 'new-contraction');
  b.tag('Contraction', 'new-contraction');
};

const irregulars = {
  can: 'can\'t',
  will: 'won\'t'
};

const contract = function(ts) {
  if (ts.expanded === false || ts.match('#Contraction').found) {
    return ts;
  }
  //he is -> he's
  ts.match('(#Noun|#QuestionWord) is').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'s';
    ls.contracted = true;
  });
  //he did -> he'd
  ts.match('#PronNoun did').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //how do -> how'd
  ts.match('#QuestionWord (did|do)').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //he would -> he'd
  ts.match('#Noun (could|would)').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //they are -> they're
  ts.match('(they|we|you) are').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'re';
    ls.contracted = true;
  });
  //i am -> i'm
  ts.match('i am').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'m';
    ls.contracted = true;
  });
  //they will -> they'll
  ts.match('(#Noun|#QuestionWord) will').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'ll';
    ls.contracted = true;
  });
  //they have -> they've
  ts.match('(they|we|you|i) have').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'ve';
    ls.contracted = true;
  });
  //is not -> isn't
  ts.match('(#Copula|#Modal|do|does|have|has|can|will) not').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    //can't, won't
    if (irregulars.hasOwnProperty(ls.terms[0].text) === true) {
      ls.terms[0].text = irregulars[ls.terms[0].text];
    } else {
      ls.terms[0].text += 'n\'t';
    }
    ls.contracted = true;
  });
  return ts;
};

module.exports = contract;
