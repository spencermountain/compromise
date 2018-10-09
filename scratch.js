var nlp = require('./src/index');
// nlp.verbose('tagger');

const addConjugations = function(arr) {
  let len = arr.length;
  for(let i = 0; i < len; i += 1) {
    let words = nlp(arr[i]).tag('#Verb').verbs().conjugate()[0];
    arr.push(words.Infinitive);
    arr.push(words.PresentTense);
    arr.push(words.PastTense);
    arr.push(words.Gerund);
  }
  return arr;
};

var verbs = ['leave', 'love', 'like', 'agree'];
verbs = addConjugations(verbs);

var doc = nlp('i left this school');
doc.replace(`(${verbs.join('|')})`, '_');
console.log(doc.out());
