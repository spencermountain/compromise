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

let text = `
It's free for 4 and free for 5
`;
let doc = nlp(text);
let arr = doc.ngrams({
  max: 3
}).data();
console.log(arr.find(o => o.normal === 'free for'));
