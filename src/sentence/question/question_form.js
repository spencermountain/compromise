'use strict';
//classifies a question into:

// how
// what
// when
// where
// which
// who
// why
// number
// yesNo

//exceptions:
// You bought what!? - Echo question
// Who bought what? - Multiple wh-expressions
// I wonder who Fred will ask to leave. - passive question

// Yes/No questions take the form:
// he is -> is he?
const yesNoVerb = {
  is: true,
  are: true,
  was: true,
  will: true,
  do: true,
  did: true,
};

// "Five Ws and one H" + 'which'
let forms = {
  who: ['whose', 'whom', 'which person'],
  what: ['what\'s'],
  where: ['what place', 'what city'],
  when: ['what time', 'what day', 'which day', 'what year', 'which year'],
  why: ['how come'],
  how: ['in what way'],
  which: ['what one'],
  number: ['how many', 'how much', 'how far', 'how long'],
};
//build-out this mapping
const interrogatives = Object.keys(forms).reduce((h, k) => {
  //set array as key
  let arr = forms[k];
  for(let i = 0; i < arr.length; i++) {
    h[arr[i]] = k;
  }
  //set key as itself
  h[k] = k;
  return h;
}, {});

const question_form = function(s) {
  //loop through and find first signal
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    let lastTerm = s.terms[i - 1];
    let nextTerm = s.terms[i + 1];

    //some interrogative forms are two-terms, try it.
    if (nextTerm) {
      let twoTerm = t.normal + ' ' + nextTerm.normal;
      if (interrogatives[twoTerm]) {
        return interrogatives[twoTerm];
      }
    }
    //try an interrogative first - 'who'
    if (interrogatives[t.normal]) {
      return interrogatives[t.normal];
    }
    //an interrogative as a contraction - 'why'd'
    if (interrogatives[t.expansion]) {
      return interrogatives[t.expansion];
    }

    //try a yes/no question then
    if (yesNoVerb[t.normal] || yesNoVerb[t.expansion]) {
      //leading 'is x...' is a question
      if (!lastTerm) {
        return 'yesNo';
      }
      //ending '... are.' is a not question
      if (!lastTerm) {
        continue;
      }
      // 'he is' is not a question..
      if (lastTerm.pos['Pronoun'] || lastTerm.pos['Person']) {
        continue;
      }
      // 'is he' is a question..
      if (nextTerm.pos['Pronoun'] || nextTerm.pos['Person']) {
        return 'yesNo';
      }
    }
  }
  return null;
};


module.exports = question_form;
