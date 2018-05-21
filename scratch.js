var nlp = require('./src/index');
// nlp.verbose('tagger');

// let doc = nlp('100+').debug();

// nlp('the united states senate').match('the (canadian|united states)').debug();
// nlp('really pretty cool').debug(); //.match('#Copula [(just|alone)$]').debug();
// nlp('i am pretty confused').debug();

// nlp('the united states congress').match('the (united states|canada) .');
// nlp('is it fun').questions().debug();

// console.log(nlp('the cool, version of a fun canadian senate').match('#Adjective').setPunctuation('?').debug().getPunctuation());

// nlp('Jim is nice, funny, cool').match('is #Adjective+').out();

//isQuestion(), .not(Text)

// let doc = nlp(`John Smith bought automobiles (for us)`);
// doc.normalize({
//   verbs: true,
//   parentheses: true,
// // plurals: true,
// // possessives: true,
// }).debug();
var doc = nlp(`Corey Hart's pudding and Google's advertising`);
doc = doc.normalize({
  possessives: true
});
doc.debug();
