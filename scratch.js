var nlp = require('./src/index');
nlp.verbose('tagger');



var txt = `Probably the renovation right away from the amount of work, which has been done to the property.
I have one two, three, four five six properties, which came on the market in the month.
I think that the number one quite comfortable looking at the two properties, which I'm working on now.`;
let questions = nlp(txt).debug().sentences().isQuestion().out('array');
console.log(questions);
