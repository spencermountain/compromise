var nlp = require('./src/index');
// nlp.verbose('tagger');

// var text = 'oh hello. please turn on the lights and then take out the garbage too. After that, play some music.';
//
// var doc = nlp(text);
//
// //basic template for 'take out the garbage'
// var matches = doc.match('#Verb+ (the|some|a|an) #Noun');
//
// var commands = matches.list.map(ts => {
//   return {
//     action: ts.match('^#Verb+').out('root'),
//     target: ts.match('#Noun+$').out('root')
//   };
// });
// console.log(commands);

//todo: test this
// nlp('a 1-1 meeting.').values();
// nlp('a 1-1 meeting.').values().toText().debug();

nlp('recycling is important').debug();
