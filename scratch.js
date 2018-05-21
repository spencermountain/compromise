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

// let doc = nlp(`John Smith bought automobiles`);
// doc.verbs().toInfinitive();
// doc.normalize({
//   // case: false,
//   plurals: true,
//   // possessives: true,
//   verbs: true,
// }).debug();
// nlp(`Dog refers to a`).debug();

console.log(nlp('Number II').has('Number II'));
console.log(nlp('Number I').has('Number I'));
