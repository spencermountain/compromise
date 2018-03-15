var nlp = require('./src/index');
// nlp.verbose('tagger');

// let doc=nlp('My (teacher) said').parentheses().debug();
let doc = nlp('My (teacher said) to (him) and that was good');
let terms = doc.terms();
let arr = [];
terms.forEach((t) => {
  let term = t.list[0].terms[0];
  console.log(term.tags);
  if (term.tags.StartBracket === true) {
    console.log(term.text);
  }
});
