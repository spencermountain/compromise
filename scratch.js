var nlp = require('./src/index');
// nlp.verbose('tagger');
// var myWords = {
//   'university of toronto': 'Organization',
//   'girble': 'CuteThing'
// };
// var r = nlp('he studied girbles at the University-of-Toronto', myWords);
// r.debug();
// var doc = nlp('girble').nouns().toPlural().debug();
// doc.debug();

let doc = nlp('The Bill was passed by James MacCarthur');
doc.debug();
console.log(doc.people().out('array'));
//(rod|rob|dick|buck|bob|rusty|sandy|van|sky|bill|mark|jack|al|ray|paris|misty|jean|jan|may|piper|wade|ollie|pat|randy|robin|trinity|alexandria|houston|al|kobe|salvador
